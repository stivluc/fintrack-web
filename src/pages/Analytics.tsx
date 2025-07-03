import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  useTheme,
  Alert,
  ButtonGroup,
  Button,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { AnalyticsSkeleton } from '../components/common/LoadingSkeletons';
import apiService, { Analytics } from '../services/api';

const AnalyticsPage: React.FC = () => {
  const theme = useTheme();
  const [period, setPeriod] = useState<number>(6);

  const { data: analyticsData, isLoading, error } = useQuery<Analytics>({
    queryKey: ['analytics', period],
    queryFn: () => apiService.getAnalytics(period),
    placeholderData: (previousData) => previousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const CustomTooltip = useCallback(({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      // Remove duplicates by creating a map with unique entries
      const uniqueEntries = new Map();
      payload.forEach((entry: any) => {
        if (entry.value !== undefined && entry.value !== null) {
          uniqueEntries.set(entry.dataKey || entry.name, entry);
        }
      });
      
      return (
        <Box
          sx={{
            background: 'rgba(56, 56, 56, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            p: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            maxWidth: 200,
          }}
        >
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
            {label}
          </Typography>
          {Array.from(uniqueEntries.values()).map((entry: any, index: number) => (
            <Typography
              key={`${entry.dataKey || entry.name}-${index}`}
              variant="body2"
              sx={{ color: entry.color, fontWeight: 500 }}
            >
              {entry.name}: {formatCurrency(entry.value)}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  }, [theme.palette.text.secondary]);

  const categoryColors: { [key: string]: string } = {
    'Alimentation': '#4F46E5',
    'Transport': '#10B981',
    'Logement': '#F59E0B',
    'Loisirs': '#EF4444',
    'Santé': '#EC4899',
    'Shopping': '#8B5CF6',
  };

  // Transform category trends data for LineChart
  const categoryTrendsData = useMemo(() => {
    if (!analyticsData?.category_trends || !analyticsData?.monthly_data) return [];
    
    const months = analyticsData.monthly_data.map((item: any) => item.month);
    
    return months.map((month: string) => {
      const dataPoint: any = { month };
      analyticsData.category_trends.forEach((trend: any) => {
        const monthData = trend.data.find((d: any) => d.month === month);
        dataPoint[trend.category] = monthData ? monthData.amount : 0;
      });
      return dataPoint;
    });
  }, [analyticsData]);

  if (isLoading) {
    return <AnalyticsSkeleton />;
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Analytics
        </Typography>
        <Alert severity="error" sx={{ mb: 3 }}>
          Erreur lors du chargement des analytics. Veuillez réessayer.
        </Alert>
      </Box>
    );
  }

  if (!analyticsData) {
    return null;
  }

  const { monthly_data, category_trends, insights } = analyticsData;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Analytics
        </Typography>
        <ButtonGroup size="small">
          {[3, 6, 12].map((months) => (
            <Button
              key={months}
              variant={period === months ? 'contained' : 'outlined'}
              onClick={() => setPeriod(months)}
            >
              {months} mois
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ height: 400 }}>
            <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Revenus vs Dépenses
              </Typography>
              <Box sx={{ flex: 1, minHeight: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthly_data}>
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
                  <LineChart data={categoryTrendsData}>
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
                    {category_trends.map((trend, index) => (
                      <Line
                        key={trend.category}
                        type="monotone"
                        dataKey={trend.category}
                        stroke={categoryColors[trend.category] || `hsl(${index * 60}, 70%, 50%)`}
                        strokeWidth={2}
                        name={trend.category}
                      />
                    ))}
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
                {formatCurrency(insights.avg_monthly_savings)}
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
                {insights.savings_rate.toFixed(1)}%
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
                du revenu total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Plus grosse dépense
              </Typography>
              {insights.biggest_expense ? (
                <>
                  <Typography variant="h4" sx={{ color: theme.palette.warning.main, fontWeight: 700 }}>
                    {formatCurrency(insights.biggest_expense.amount)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
                    {insights.biggest_expense.category}
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block' }}>
                    {formatDate(insights.biggest_expense.date)}
                  </Typography>
                </>
              ) : (
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Aucune dépense trouvée
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsPage;