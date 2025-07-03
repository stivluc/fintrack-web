import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { AccountBalance, TrendingUp, CreditCard, Savings } from '@mui/icons-material';
import StatsCard from '../components/common/StatsCard';
import WealthChart from '../components/charts/WealthChart';
import ExpenseChart from '../components/charts/ExpenseChart';

const Dashboard: React.FC = () => {

  const wealthData = [
    { month: 'Jan', wealth: 45000 },
    { month: 'Feb', wealth: 47500 },
    { month: 'Mar', wealth: 44000 },
    { month: 'Apr', wealth: 48500 },
    { month: 'May', wealth: 52000 },
    { month: 'Jun', wealth: 54500 },
  ];

  const expenseData = [
    { name: 'Alimentation', value: 1200, color: '#4F46E5' },
    { name: 'Transport', value: 800, color: '#10B981' },
    { name: 'Logement', value: 2000, color: '#F59E0B' },
    { name: 'Loisirs', value: 600, color: '#EF4444' },
    { name: 'Autres', value: 400, color: '#8B5CF6' },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Patrimoine Total"
            value="€54,500"
            change={4.8}
            changeType="positive"
            icon={<AccountBalance />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Revenus ce mois"
            value="€4,200"
            change={2.1}
            changeType="positive"
            icon={<TrendingUp />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Dépenses ce mois"
            value="€3,200"
            change={-1.2}
            changeType="negative"
            icon={<CreditCard />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatsCard
            title="Épargne"
            value="€1,000"
            change={12.5}
            changeType="positive"
            icon={<Savings />}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <WealthChart data={wealthData} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <ExpenseChart data={expenseData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;