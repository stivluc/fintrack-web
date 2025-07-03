import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';

interface ExpenseData {
  name: string;
  value: number;
  color: string;
}

interface ExpenseChartProps {
  data: ExpenseData[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  const theme = useTheme();

  // Calculer le total pour les pourcentages
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
    const percent = (value / total) * 100;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        {/* <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        /> */}
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="white" fontSize="12" fontWeight="500">
          {payload.name}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="white" fontSize="14" fontWeight="600">
          €{value.toLocaleString()}
        </text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={36} textAnchor={textAnchor} fill={theme.palette.text.secondary} fontSize="12">
          ({percent.toFixed(1)}%)
        </text>
      </g>
    );
  };

  return (
    <Card sx={{ height: 350 }}>
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Répartition des dépenses
        </Typography>
        <Box sx={{ flex: 1, minHeight: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 25, right: 60, bottom: 25, left: 60 }}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                dataKey="value"
                labelLine={true}
                label={renderActiveShape}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;