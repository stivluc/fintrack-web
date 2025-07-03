import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiService, { User, LoginCredentials } from '../services/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = async () => {
    try {
      if (apiService.isAuthenticated()) {
        const userData = await apiService.getCurrentUser();
        setUser(userData);
        localStorage.setItem('fintrack_user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Failed to load user:', error);
      // Clear invalid tokens
      apiService.logout();
      localStorage.removeItem('fintrack_user');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if we have stored user data and valid tokens
    const storedUser = localStorage.getItem('fintrack_user');
    if (storedUser && apiService.isAuthenticated()) {
      setUser(JSON.parse(storedUser));
      // Refresh user data from API
      loadUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const credentials: LoginCredentials = { email, password };
      await apiService.login(credentials);
      
      // Get user data after successful login
      const userData = await apiService.getCurrentUser();
      setUser(userData);
      localStorage.setItem('fintrack_user', JSON.stringify(userData));
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
    localStorage.removeItem('fintrack_user');
  };

  const refreshUser = async () => {
    try {
      const userData = await apiService.getCurrentUser();
      setUser(userData);
      localStorage.setItem('fintrack_user', JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};