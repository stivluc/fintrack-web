import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { AccountBalance, TrendingUp, CreditCard, Savings } from '@mui/icons-material';
import StatsCard from '../components/common/StatsCard';
import WealthChart from '../components/charts/WealthChart';
import WealthCompositionChart from '../components/charts/WealthCompositionChart';

const Dashboard: React.FC = () => {

  const wealthData = [
    { month: 'Jan', wealth: 45000 },
    { month: 'Feb', wealth: 47500 },
    { month: 'Mar', wealth: 44000 },
    { month: 'Apr', wealth: 48500 },
    { month: 'May', wealth: 52000 },
    { month: 'Jun', wealth: 54500 },
  ];

  const wealthCompositionData = [
    { name: 'Immobilier', size: 180000, index: 0 },
    { name: 'Actions', size: 45000, index: 1 },
    { name: 'Assur...', size: 35000, index: 2 },
    { name: 'Livret A', size: 22300, index: 3 },
    { name: 'PEL', size: 18000, index: 4 },
    { name: 'Compte courant', size: 8500, index: 5 },
    { name: 'Crypto', size: 12000, index: 6 },
    { name: 'Or/Métaux', size: 5000, index: 7 },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatsCard
            title="Patrimoine Total"
            value="€54,500"
            change={4.8}
            changeType="positive"
            icon={<AccountBalance />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatsCard
            title="Revenus ce mois"
            value="€4,200"
            change={2.1}
            changeType="positive"
            icon={<TrendingUp />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatsCard
            title="Dépenses ce mois"
            value="€3,200"
            change={-1.2}
            changeType="positive"
            icon={<CreditCard />}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
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
        <Grid size={{ xs: 12, lg: 7 }}>
          <WealthChart data={wealthData} />
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <WealthCompositionChart data={wealthCompositionData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;