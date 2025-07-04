import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Alert } from '@mui/material';
import { AccountBalance, TrendingUp, TrendingDown, Savings } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import StatsCard from '../components/common/StatsCard';
import WealthChart from '../components/charts/WealthChart';
import WealthCompositionChart from '../components/charts/WealthCompositionChart';
import { DashboardSkeleton } from '../components/common/LoadingSkeletons';
import apiService, { DashboardStats } from '../services/api';

const Dashboard: React.FC = () => {
  const { data: dashboardData, isLoading, error } = useQuery<DashboardStats>({
    queryKey: ['dashboardStats'],
    queryFn: () => apiService.getDashboardStats(),
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
  });

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatChange = (change: number): number => {
    return Math.round(change * 10) / 10; // Round to 1 decimal
  };

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Dashboard
        </Typography>
        <Alert severity="error" sx={{ mb: 3 }}>
          Erreur lors du chargement des données du dashboard. Veuillez réessayer.
        </Alert>
      </Box>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const { current_month, wealth_evolution, wealth_composition } = dashboardData;

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatsCard
            title="Patrimoine Total"
            value={formatCurrency(current_month.total_wealth)}
            change={formatChange(current_month.wealth_change)}
            changeType={current_month.wealth_change >= 0 ? "positive" : "negative"}
            icon={<AccountBalance />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatsCard
            title="Revenus (30 derniers jours)"
            value={formatCurrency(current_month.income)}
            change={formatChange(current_month.income_change)}
            changeType={current_month.income_change >= 0 ? "positive" : "negative"}
            icon={<TrendingUp />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatsCard
            title="Dépenses (30 derniers jours)"
            value={formatCurrency(current_month.expenses)}
            change={formatChange(Math.abs(current_month.expenses_change))}
            changeType={current_month.expenses_change <= 0 ? "positive" : "negative"}
            icon={current_month.expenses_change <= 0 ? <TrendingDown /> : <TrendingUp />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatsCard
            title="Épargne (30 derniers jours)"
            value={formatCurrency(current_month.savings)}
            change={formatChange(current_month.savings_change)}
            changeType={current_month.savings_change >= 0 ? "positive" : "negative"}
            icon={<Savings />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <WealthChart />
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <WealthCompositionChart data={wealth_composition} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;