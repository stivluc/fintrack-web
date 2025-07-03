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

interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
  color: string;
}

const Budgets: React.FC = () => {
  const theme = useTheme();

  const budgets: Budget[] = [
    {
      id: '1',
      category: 'Alimentation',
      allocated: 1500,
      spent: 1200,
      color: '#4F46E5',
    },
    {
      id: '2',
      category: 'Transport',
      allocated: 800,
      spent: 850,
      color: '#10B981',
    },
    {
      id: '3',
      category: 'Logement',
      allocated: 2000,
      spent: 2000,
      color: '#F59E0B',
    },
    {
      id: '4',
      category: 'Loisirs',
      allocated: 600,
      spent: 450,
      color: '#EF4444',
    },
    {
      id: '5',
      category: 'Autres',
      allocated: 400,
      spent: 320,
      color: '#8B5CF6',
    },
  ];

  const getProgressColor = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100;
    if (percentage > 100) return theme.palette.error.main;
    if (percentage > 80) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  const getStatusIcon = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100;
    if (percentage > 100) return <Error sx={{ color: theme.palette.error.main }} />;
    if (percentage > 80) return <Warning sx={{ color: theme.palette.warning.main }} />;
    return <CheckCircle sx={{ color: theme.palette.success.main }} />;
  };

  const getStatusMessage = (spent: number, allocated: number) => {
    const percentage = (spent / allocated) * 100;
    const remaining = allocated - spent;
    
    if (percentage > 100) {
      return `Dépassement de €${Math.abs(remaining).toLocaleString()}`;
    }
    if (percentage > 80) {
      return `Attention: €${remaining.toLocaleString()} restant`;
    }
    return `€${remaining.toLocaleString()} restant`;
  };

  const totalAllocated = budgets.reduce((sum, budget) => sum + budget.allocated, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const overBudgetCount = budgets.filter(budget => budget.spent > budget.allocated).length;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Budgets
      </Typography>

      {overBudgetCount > 0 && (
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
          {overBudgetCount} budget(s) dépassé(s) ce mois-ci
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Budget Total
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
                €{totalAllocated.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Dépensé
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.error.main, fontWeight: 700 }}>
                €{totalSpent.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Restant
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: totalSpent > totalAllocated 
                    ? theme.palette.error.main 
                    : theme.palette.success.main,
                  fontWeight: 700,
                }}
              >
                €{(totalAllocated - totalSpent).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {budgets.map((budget) => {
          const percentage = Math.min((budget.spent / budget.allocated) * 100, 100);
          return (
            <Grid size={{ xs: 12, md: 6 }} key={budget.id}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {budget.category}
                    </Typography>
                    {getStatusIcon(budget.spent, budget.allocated)}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      €{budget.spent.toLocaleString()} / €{budget.allocated.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {percentage.toFixed(1)}%
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={percentage}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      mb: 2,
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: getProgressColor(budget.spent, budget.allocated),
                        borderRadius: 4,
                      },
                    }}
                  />

                  <Typography
                    variant="body2"
                    sx={{
                      color: getProgressColor(budget.spent, budget.allocated),
                      fontWeight: 500,
                    }}
                  >
                    {getStatusMessage(budget.spent, budget.allocated)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Budgets;