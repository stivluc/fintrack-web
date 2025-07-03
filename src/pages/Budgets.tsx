import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  useTheme,
  Alert,
} from '@mui/material';
import { Warning, CheckCircle, Error } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import ExpenseChart from '../components/charts/ExpenseChart';
import { BudgetsSkeleton } from '../components/common/LoadingSkeletons';
import apiService, { BudgetOverview } from '../services/api';

const Budgets: React.FC = () => {
  const theme = useTheme();

  const { data: budgetData, isLoading, error } = useQuery<BudgetOverview>({
    queryKey: ['budgetOverview'],
    queryFn: () => apiService.getBudgetOverview(),
    refetchInterval: 2 * 60 * 1000, // Refresh every 2 minutes
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'exceeded':
        return <Error sx={{ color: theme.palette.error.main }} />;
      case 'warning':
        return <Warning sx={{ color: theme.palette.warning.main }} />;
      default:
        return <CheckCircle sx={{ color: theme.palette.success.main }} />;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'exceeded':
        return theme.palette.error.main;
      case 'warning':
        return theme.palette.warning.main;
      default:
        return theme.palette.success.main;
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (isLoading) {
    return <BudgetsSkeleton />;
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Budgets
        </Typography>
        <Alert severity="error" sx={{ mb: 3 }}>
          Erreur lors du chargement des budgets. Veuillez réessayer.
        </Alert>
      </Box>
    );
  }

  if (!budgetData) {
    return null;
  }

  const { summary, budgets, expense_chart_data } = budgetData;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Budgets
      </Typography>
      

      {summary.over_budget_count > 0 && (
        <Alert
          severity="warning"
          sx={{
            mb: 3,
            borderRadius: '12px',
            '& .MuiAlert-icon': {
              color: theme.palette.warning.main,
            },
          }}
        >
          {summary.over_budget_count} budget{summary.over_budget_count > 1 ? 's' : ''} dépassé{summary.over_budget_count > 1 ? 's' : ''} ce mois-ci
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 4}}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Budget Total
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
                {formatCurrency(summary.total_allocated)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4}}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Dépensé
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.error.main, fontWeight: 700 }}>
                {formatCurrency(summary.total_spent)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4}}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Restant
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: summary.total_remaining < 0 
                    ? theme.palette.error.main 
                    : theme.palette.success.main,
                  fontWeight: 700,
                }}
              >
                {formatCurrency(summary.total_remaining)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {expense_chart_data.length > 0 && (
        <Grid size={{ xs: 12 }} mb={4}>
          <ExpenseChart data={expense_chart_data} />
        </Grid>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Grid container spacing={3}>
            {budgets.map((budget) => (
              <Grid size={{ xs: 12, sm: 6}} key={budget.id}>
                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {budget.category.name}
                      </Typography>
                      {getStatusIcon(budget.status)}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {formatCurrency(budget.spent)} / {formatCurrency(budget.allocated)}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {budget.percentage}%
                      </Typography>
                    </Box>

                    <LinearProgress
                      variant="determinate"
                      value={Math.min(budget.percentage, 100)}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        mb: 2,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: getProgressColor(budget.status),
                          borderRadius: 4,
                        },
                      }}
                    />

                    <Typography
                      variant="body2"
                      sx={{
                        color: getProgressColor(budget.status),
                        fontWeight: 500,
                      }}
                    >
                      {budget.remaining < 0 
                        ? `Dépassement de ${formatCurrency(Math.abs(budget.remaining))}`
                        : `${formatCurrency(budget.remaining)} restant`
                      }
                    </Typography>
                    
                    <Typography variant="caption" sx={{ color: 'text.secondary', mt: 1, display: 'block' }}>
                      {budget.days_left} jour{budget.days_left > 1 ? 's' : ''} restant ce mois
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Budgets;