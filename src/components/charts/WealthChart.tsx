import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, Box, useTheme, Button, ButtonGroup } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import apiService, { DashboardStats } from '../../services/api';

interface WealthData {
  month: string;
  wealth: number;
}

interface WealthChartProps {
  // Remove data prop since we'll fetch it directly based on the filter
}

type TimeFilter = '1M' | '6M' | '1Y' | 'YTD' | 'MAX';

const WealthChart: React.FC<WealthChartProps> = () => {
  const theme = useTheme();
  const [selectedFilter, setSelectedFilter] = useState<TimeFilter>('1Y');
  
  // Fetch dashboard data with the selected period filter
  const { data: dashboardData, isLoading, error } = useQuery<DashboardStats>({
    queryKey: ['dashboardStats', selectedFilter],
    queryFn: () => apiService.getDashboardStats(selectedFilter),
    refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
  });

  const chartData = dashboardData?.wealth_evolution || [];
  
  const handleFilterChange = (filter: TimeFilter) => {
    setSelectedFilter(filter);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            background: 'rgba(55, 55, 55, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            p: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            {label}
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
            {new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(payload[0].value)}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Card sx={{ height: 400 }}>
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Évolution du patrimoine
          </Typography>
          <ButtonGroup size="small" sx={{ '& .MuiButton-root': { minWidth: 40, fontSize: '0.75rem' } }}>
            {(['1M', '6M', '1Y', 'YTD', 'MAX'] as TimeFilter[]).map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? 'contained' : 'outlined'}
                onClick={() => handleFilterChange(filter)}
                sx={{
                  ...(selectedFilter === filter && {
                    background: 'linear-gradient(135deg, #D4AF37 0%, #F4E976 100%)',
                    color: '#000',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #D4AF37 0%, #F4E976 100%)',
                    }
                  })
                }}
              >
                {filter}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
        <Box sx={{ flex: 1, minHeight: 300 }}>
          {isLoading ? (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              color: theme.palette.text.secondary
            }}>
              <Typography variant="body2">
                Chargement...
              </Typography>
            </Box>
          ) : error ? (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              color: theme.palette.error.main
            }}>
              <Typography variant="body2">
                Erreur lors du chargement des données
              </Typography>
            </Box>
          ) : chartData.length === 0 ? (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              color: theme.palette.text.secondary
            }}>
              <Typography variant="body2">
                Aucune donnée disponible pour l'évolution du patrimoine
              </Typography>
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="wealthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                <XAxis 
                  dataKey="month" 
                  stroke={theme.palette.text.secondary}
                  fontSize={12}
                />
                <YAxis 
                  stroke={theme.palette.text.secondary}
                  fontSize={12}
                  tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                  domain={[(dataMin: number) => Math.floor(dataMin * 0.95), (dataMax: number) => Math.ceil(dataMax * 1.05)]}
                  scale="linear"
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="wealth"
                  stroke="#D4AF37"
                  strokeWidth={2}
                  fill="url(#wealthGradient)"
                  dot={false}
                  activeDot={{ r: 6, fill: '#D4AF37', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WealthChart;