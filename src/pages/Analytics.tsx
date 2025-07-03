import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  useTheme,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Analytics: React.FC = () => {
  const theme = useTheme();

  const monthlyData = [
    { month: 'Jan', income: 4200, expenses: 3800 },
    { month: 'Feb', income: 4200, expenses: 3600 },
    { month: 'Mar', income: 4200, expenses: 4200 },
    { month: 'Apr', income: 4200, expenses: 3500 },
    { month: 'May', income: 4200, expenses: 3200 },
    { month: 'Jun', income: 4200, expenses: 3400 },
  ];

  const categoryTrends = [
    { month: 'Jan', alimentation: 1200, transport: 800, logement: 2000, loisirs: 600 },
    { month: 'Feb', alimentation: 1150, transport: 750, logement: 2000, loisirs: 550 },
    { month: 'Mar', alimentation: 1300, transport: 900, logement: 2000, loisirs: 700 },
    { month: 'Apr', alimentation: 1100, transport: 700, logement: 2000, loisirs: 500 },
    { month: 'May', alimentation: 1000, transport: 650, logement: 2000, loisirs: 450 },
    { month: 'Jun', alimentation: 1200, transport: 800, logement: 2000, loisirs: 600 },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            background: 'rgba(56, 56, 56, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            p: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
            {label}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: entry.color, fontWeight: 500 }}
            >
              {entry.name}: €{entry.value.toLocaleString()}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Analytics
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ height: 400 }}>
            <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Revenus vs Dépenses
              </Typography>
              <Box sx={{ flex: 1, minHeight: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis 
                    dataKey="month" 
                    stroke={theme.palette.text.secondary}
                    fontSize={12}
                  />
                  <YAxis 
                    stroke={theme.palette.text.secondary}
                    fontSize={12}
                    tickFormatter={(value) => `€${value / 1000}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="income" 
                    fill={theme.palette.success.main}
                    radius={[4, 4, 0, 0]}
                    name="Revenus"
                  />
                  <Bar 
                    dataKey="expenses" 
                    fill={theme.palette.error.main}
                    radius={[4, 4, 0, 0]}
                    name="Dépenses"
                  />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ height: 400 }}>
            <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Tendances par catégorie
              </Typography>
              <Box sx={{ flex: 1, minHeight: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={categoryTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis 
                    dataKey="month" 
                    stroke={theme.palette.text.secondary}
                    fontSize={12}
                  />
                  <YAxis 
                    stroke={theme.palette.text.secondary}
                    fontSize={12}
                    tickFormatter={(value) => `€${value / 1000}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="alimentation"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    name="Alimentation"
                  />
                  <Line
                    type="monotone"
                    dataKey="transport"
                    stroke="#10B981"
                    strokeWidth={2}
                    name="Transport"
                  />
                  <Line
                    type="monotone"
                    dataKey="logement"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    name="Logement"
                  />
                  <Line
                    type="monotone"
                    dataKey="loisirs"
                    stroke="#EF4444"
                    strokeWidth={2}
                    name="Loisirs"
                  />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Économies moyennes
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.success.main, fontWeight: 700 }}>
                €533
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
                par mois
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Taux d'épargne
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 700 }}>
                12.7%
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
                du revenu total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md:4 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Plus grosse dépense
              </Typography>
              <Typography variant="h4" sx={{ color: theme.palette.warning.main, fontWeight: 700 }}>
                €2,000
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
                Logement
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;