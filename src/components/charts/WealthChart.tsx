import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, Box, useTheme, Button, ButtonGroup } from '@mui/material';

interface WealthData {
  month: string;
  wealth: number;
}

interface WealthChartProps {
  data: WealthData[];
}

type TimeFilter = '1M' | '6M' | '1Y' | 'YTD' | 'MAX';

// Dummy data generator with realistic variations and growth trend
const generateDummyData = (filter: TimeFilter): WealthData[] => {
  const now = new Date();
  let dataPoints: WealthData[] = [];
  
  const getInitialWealth = (filter: TimeFilter) => {
    switch (filter) {
      case '1M': return 52000;
      case '6M': return 48000;
      case '1Y': return 40000;
      case 'YTD': return 45000;
      case 'MAX': return 15000;
      default: return 45000;
    }
  };
  
  let baseWealth = getInitialWealth(filter);
  
  // Growth trend factor - ensures long-term growth
  const getGrowthTrend = (index: number, totalPoints: number, filter: TimeFilter) => {
    const progress = index / totalPoints;
    const baseGrowth = filter === 'MAX' ? 800 : filter === '1Y' ? 300 : 150;
    return baseGrowth * progress * (1 + Math.random() * 0.3);
  };
  
  switch (filter) {
    case '1M':
      // Generate daily data for the last month
      for (let i = 30; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dayOfMonth = date.getDate();
        
        // Major financial events
        if (dayOfMonth === 1) {
          baseWealth -= 1800; // Rent
        } else if (dayOfMonth === 25) {
          baseWealth += 3200; // Salary
        } else if (dayOfMonth === 15) {
          baseWealth -= Math.random() * 400 + 200; // Mid-month expenses
        } else if (dayOfMonth === 5) {
          baseWealth += Math.random() * 500 + 100; // Investment gains
        } else if (dayOfMonth === 10) {
          baseWealth += Math.random() * 300 + 150; // Freelance income
        } else if (dayOfMonth === 20) {
          baseWealth -= Math.random() * 350 + 175; // Bills
        } else {
          baseWealth += (Math.random() - 0.4) * 200; // Daily variations (slightly positive bias)
        }
        
        // Add growth trend
        baseWealth += getGrowthTrend(30 - i, 30, filter);
        
        dataPoints.push({
          month: date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
          wealth: Math.max(0, baseWealth)
        });
      }
      break;
      
    case '6M':
      // Generate weekly data for 6 months (26 weeks)
      for (let i = 26; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
        const weekIndex = 26 - i;
        
        // Weekly salary (every 4 weeks)
        if (weekIndex % 4 === 0 && weekIndex > 0) {
          baseWealth += 3200;
        }
        
        // Weekly rent (every 4 weeks)
        if (weekIndex % 4 === 1) {
          baseWealth -= 1800;
        }
        
        // Weekly expenses
        baseWealth -= Math.random() * 300 + 200;
        
        // Weekly savings/investments
        baseWealth += Math.random() * 200 + 150;
        
        // Special events
        if (weekIndex === 12) baseWealth += 2500; // Bonus
        if (weekIndex === 20) baseWealth -= 3000; // Vacation
        if (weekIndex === 4) baseWealth -= 1500; // Insurance
        if (weekIndex === 16) baseWealth += 1200; // Tax refund
        
        // Market fluctuations
        baseWealth += (Math.random() - 0.3) * 800;
        
        // Growth trend
        baseWealth += getGrowthTrend(weekIndex, 26, filter);
        
        dataPoints.push({
          month: date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
          wealth: Math.max(0, baseWealth)
        });
      }
      break;
      
    case '1Y':
      // Generate bi-weekly data for 1 year (26 bi-weeks)
      for (let i = 26; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 14 * 24 * 60 * 60 * 1000);
        const biweekIndex = 26 - i;
        
        // Bi-weekly salary (every 2 periods)
        if (biweekIndex % 2 === 0) {
          baseWealth += 1600; // Half monthly salary
        }
        
        // Bi-weekly rent (every 2 periods)
        if (biweekIndex % 2 === 1) {
          baseWealth -= 900; // Half monthly rent
        }
        
        // Bi-weekly expenses
        baseWealth -= Math.random() * 600 + 400;
        
        // Bi-weekly savings/investments
        baseWealth += Math.random() * 500 + 300;
        
        // Quarterly bonus (every 6.5 periods ≈ 6-7 periods)
        if (biweekIndex === 6 || biweekIndex === 13 || biweekIndex === 20) {
          baseWealth += 2500;
        }
        
        // Special events throughout the year
        if (biweekIndex === 2) baseWealth -= 4000; // Taxes
        if (biweekIndex === 12) baseWealth -= 3000; // Vacation
        if (biweekIndex === 25) baseWealth += 5000; // Year-end bonus
        if (biweekIndex === 8) baseWealth += 1500; // Tax refund
        if (biweekIndex === 16) baseWealth -= 2000; // Car repair
        if (biweekIndex === 22) baseWealth += 1800; // Side gig payment
        
        // Market volatility
        baseWealth += (Math.random() - 0.3) * 1200;
        
        // Growth trend
        baseWealth += getGrowthTrend(biweekIndex, 26, filter);
        
        dataPoints.push({
          month: date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
          wealth: Math.max(0, baseWealth)
        });
      }
      break;
      
    case 'YTD':
      // Generate weekly data for YTD (about 28 weeks for 7 months)
      const weeksYTD = Math.floor((now.getMonth() + 1) * 4.3); // Approximate weeks per month
      for (let i = weeksYTD; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
        const weekIndex = weeksYTD - i;
        
        // Weekly salary (every 4 weeks)
        if (weekIndex % 4 === 0 && weekIndex > 0) {
          baseWealth += 3200;
        }
        
        // Weekly rent (every 4 weeks)
        if (weekIndex % 4 === 1) {
          baseWealth -= 1800;
        }
        
        // Weekly expenses
        baseWealth -= Math.random() * 250 + 175;
        
        // Weekly savings/investments
        baseWealth += Math.random() * 175 + 125;
        
        // Special events based on week
        if (weekIndex === 1) baseWealth -= 4000; // Taxes
        if (weekIndex === 12) baseWealth += 2500; // Bonus
        if (weekIndex === 20) baseWealth -= 3000; // Vacation
        if (weekIndex === 8) baseWealth += 1200; // Tax refund
        if (weekIndex === 16) baseWealth -= 800; // Medical expenses
        if (weekIndex === 24) baseWealth += 900; // Freelance payment
        
        // Market volatility
        baseWealth += (Math.random() - 0.3) * 600;
        
        // Growth trend
        baseWealth += getGrowthTrend(weekIndex, weeksYTD, filter);
        
        dataPoints.push({
          month: date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }),
          wealth: Math.max(0, baseWealth)
        });
      }
      break;
      
    case 'MAX':
      for (let i = 60; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthIndex = 60 - i;
        
        // Monthly salary (with raises over time)
        const salary = 2800 + (monthIndex * 8); // Salary increases over time
        baseWealth += salary;
        
        // Monthly rent (with increases)
        const rent = 1500 + (monthIndex * 3);
        baseWealth -= rent;
        
        // Variable monthly expenses
        baseWealth -= Math.random() * 1200 + 800;
        
        // Monthly savings/investments (improving over time)
        baseWealth += Math.random() * 1000 + (monthIndex * 5);
        
        // Quarterly bonus (increasing over time)
        if (monthIndex % 3 === 0 && monthIndex > 0) {
          baseWealth += 2000 + (monthIndex * 10);
        }
        
        // Annual events
        if (monthIndex % 12 === 0 && monthIndex > 0) {
          baseWealth -= 3000; // Taxes
          baseWealth += 4000 + (monthIndex * 20); // Year-end bonus
        }
        
        // Major life events
        if (monthIndex === 24) baseWealth -= 8000; // Car purchase
        if (monthIndex === 36) baseWealth += 15000; // Inheritance
        if (monthIndex === 48) baseWealth -= 20000; // House down payment
        
        // Market volatility with long-term growth
        baseWealth += (Math.random() - 0.2) * 2000;
        
        // Strong growth trend for long-term
        baseWealth += getGrowthTrend(monthIndex, 60, filter);
        
        dataPoints.push({
          month: date.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }),
          wealth: Math.max(0, baseWealth)
        });
      }
      break;
  }
  
  return dataPoints;
};

const WealthChart: React.FC<WealthChartProps> = ({ data }) => {
  const theme = useTheme();
  const [selectedFilter, setSelectedFilter] = useState<TimeFilter>('1Y');
  const [chartData, setChartData] = useState(generateDummyData('1Y'));
  
  const handleFilterChange = (filter: TimeFilter) => {
    setSelectedFilter(filter);
    setChartData(generateDummyData(filter));
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            background: 'rgba(26, 31, 58, 0.95)',
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
            €{payload[0].value.toLocaleString()}
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
                tickFormatter={(value) => `€${value / 1000}k`}
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default WealthChart;