import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Configuration de l'API
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://fintrack-api-czav.onrender.com/api';
const API_AUTH_URL = process.env.REACT_APP_API_AUTH_URL || 'https://fintrack-api-czav.onrender.com/api/auth';

// Types pour l'authentification
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar?: string;
  is_premium: boolean;
  date_joined: string;
}

// Types pour les données financières
export interface DashboardStats {
  current_month: {
    total_wealth: number;
    wealth_change: number;
    income: number;
    income_change: number;
    expenses: number;
    expenses_change: number;
    savings: number;
    savings_change: number;
    transactions_count: number;
  };
  wealth_evolution: Array<{
    month: string;
    wealth: number;
  }>;
  wealth_composition: Array<{
    name: string;
    size: number;
    index: number;
  }>;
}

export interface PortfolioSummary {
  total_value: number;
  asset_count: number;
  composition: Array<{
    name: string;
    value: number;
    count: number;
    percentage: number;
  }>;
}

export interface Transaction {
  id: number;
  amount: number;
  date: string;
  description: string;
  category: {
    id: number;
    name: string;
    color: string;
    icon: string;
    type: 'INCOME' | 'EXPENSE';
  };
  account: {
    id: number;
    name: string;
    type: string;
  };
  is_recurring: boolean;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface BudgetOverview {
  summary: {
    total_allocated: number;
    total_spent: number;
    total_remaining: number;
    overall_percentage: number;
    over_budget_count: number;
    budget_count: number;
  };
  budgets: Array<{
    id: number;
    category: {
      id: number;
      name: string;
      color: string;
      icon: string;
    };
    allocated: number;
    spent: number;
    remaining: number;
    percentage: number;
    status: 'good' | 'warning' | 'exceeded';
    days_left: number;
  }>;
  expense_chart_data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export interface Analytics {
  monthly_data: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
  category_trends: Array<{
    category: string;
    data: Array<{
      month: string;
      amount: number;
    }>;
  }>;
  insights: {
    avg_monthly_savings: number;
    savings_rate: number;
    biggest_expense: {
      amount: number;
      description: string;
      category: string;
      date: string;
    } | null;
    total_income: number;
    total_expenses: number;
    period_months: number;
  };
}

export interface UserStatistics {
  user_info: {
    member_since: string;
    member_since_days: number;
    is_premium: boolean;
  };
  accounts: {
    total_accounts: number;
    total_balance: number;
  };
  assets: {
    total_assets: number;
    total_value: number;
  };
  transactions: {
    total_transactions: number;
    this_month_transactions: number;
    first_transaction_date: string | null;
  };
  activity: {
    avg_transactions_per_month: number;
    wealth_total: number;
  };
}

class ApiService {
  private api: AxiosInstance;
  private authApi: AxiosInstance;

  constructor() {
    // Instance pour les endpoints généraux
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Instance pour l'authentification
    this.authApi = axios.create({
      baseURL: API_AUTH_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercepteur pour ajouter le token automatiquement
    this.api.interceptors.request.use((config) => {
      const token = this.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Intercepteur pour gérer le refresh token
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await this.refreshToken();
            const token = this.getAccessToken();
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return this.api(originalRequest);
            }
          } catch (refreshError) {
            this.clearTokens();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Gestion des tokens
  private getAccessToken(): string | null {
    return localStorage.getItem('fintrack_access_token');
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem('fintrack_refresh_token');
  }

  private setTokens(tokens: AuthTokens): void {
    localStorage.setItem('fintrack_access_token', tokens.access);
    localStorage.setItem('fintrack_refresh_token', tokens.refresh);
  }

  private clearTokens(): void {
    localStorage.removeItem('fintrack_access_token');
    localStorage.removeItem('fintrack_refresh_token');
    localStorage.removeItem('fintrack_user');
  }

  // Authentification
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const response = await this.authApi.post<AuthTokens>('/jwt/create/', credentials);
    this.setTokens(response.data);
    return response.data;
  }

  async refreshToken(): Promise<AuthTokens> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.authApi.post<AuthTokens>('/jwt/refresh/', {
      refresh: refreshToken,
    });
    this.setTokens(response.data);
    return response.data;
  }

  logout(): void {
    this.clearTokens();
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  // Utilisateur
  async getCurrentUser(): Promise<User> {
    const response = await this.authApi.get<User>('/profile/', {
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    });
    return response.data;
  }

  async getUserStatistics(): Promise<UserStatistics> {
    const response = await this.authApi.get<UserStatistics>('/profile/statistics/', {
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    });
    return response.data;
  }

  async updateUserProfile(data: Partial<User>): Promise<User> {
    const response = await this.authApi.patch<User>('/profile/', data, {
      headers: {
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    });
    return response.data;
  }

  // Dashboard
  async getDashboardStats(period?: string): Promise<DashboardStats> {
    const params = period ? { period } : {};
    const response = await this.api.get<DashboardStats>('/transactions/dashboard_stats/', { params });
    return response.data;
  }

  // Portfolio
  async getPortfolioSummary(): Promise<PortfolioSummary> {
    const response = await this.api.get<PortfolioSummary>('/assets/portfolio_summary/');
    return response.data;
  }

  // Transactions
  async getTransactions(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: number;
    date_gte?: string;
    date_lte?: string;
  }): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: Transaction[];
  }> {
    const response = await this.api.get('/transactions/', { params });
    return response.data;
  }

  // Budgets
  async getBudgetOverview(): Promise<BudgetOverview> {
    const response = await this.api.get<BudgetOverview>('/budgets/overview/');
    return response.data;
  }

  async getBudgetAlerts(): Promise<{ alerts: any[] }> {
    const response = await this.api.get('/budgets/alerts/');
    return response.data;
  }

  // Analytics
  async getAnalytics(months: number = 6): Promise<Analytics> {
    const response = await this.api.get<Analytics>(`/transactions/analytics/?months=${months}`);
    return response.data;
  }

  // Catégories
  async getCategories(type?: 'INCOME' | 'EXPENSE'): Promise<any[]> {
    const params = type ? { type } : {};
    const response = await this.api.get('/categories/', { params });
    return response.data.results || response.data;
  }

  // Comptes
  async getAccounts(): Promise<any[]> {
    const response = await this.api.get('/accounts/');
    return response.data.results || response.data;
  }

  // Assets
  async getAssets(): Promise<any[]> {
    const response = await this.api.get('/assets/');
    return response.data.results || response.data;
  }

  // Health check
  async healthCheck(): Promise<any> {
    const response = await axios.get(`${API_BASE_URL.replace('/api', '')}/health/`);
    return response.data;
  }
}

// Instance singleton
export const apiService = new ApiService();
export default apiService;