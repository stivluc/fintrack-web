import React from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';

interface WealthCompositionData {
  name: string;
  size: number;
  index: number;
  [key: string]: any;
}

interface WealthCompositionChartProps {
  data: WealthCompositionData[];
}

const WealthCompositionChart: React.FC<WealthCompositionChartProps> = ({ data }) => {
  const theme = useTheme();

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const itemIndex = data.index || 0;
      const itemColor = COLORS[itemIndex % COLORS.length];
      
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
            {data.name}
          </Typography>
          <Typography variant="h6" sx={{ color: itemColor, fontWeight: 600 }}>
            €{data.size?.toLocaleString()}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  const COLORS = theme.chartColors;

  const CustomContent = (props: any) => {
    const { x, y, width, height, index, payload, name, value } = props;
        
    // Dans Recharts Treemap, les données peuvent être dans différentes propriétés
    const itemSize = value || payload?.size || 0;
    const itemName = name || payload?.name || '';
    
    if (!itemSize) return null;
    
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: COLORS[index % COLORS.length],
            stroke: 'none',
          }}
        />
        {width > 80 && height > 50 && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 6}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="13"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {itemName}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 8}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="14"
              fontWeight="500"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              €{itemSize.toLocaleString()}
            </text>
          </>
        )}
        {width > 60 && height > 35 && width <= 80 && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 4}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="9"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {itemName.length > 8 ? itemName.substring(0, 6) + '...' : itemName}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 7}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="10"
              fontWeight="500"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              €{(itemSize / 1000).toFixed(0)}k
            </text>
          </>
        )}
        {width > 40 && height > 25 && width <= 60 && (
          <>
            <text
              x={x + width / 2}
              y={y + height / 2 - 3}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="7"
              fontWeight="400"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {itemName.length > 6 ? itemName.substring(0, 4) + '...' : itemName}
            </text>
            <text
              x={x + width / 2}
              y={y + height / 2 + 6}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="8"
              fontWeight="500"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              €{(itemSize / 1000).toFixed(0)}k
            </text>
          </>
        )}
        {width > 25 && height > 15 && width <= 40 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="7"
            fontWeight="400"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {itemName.length > 6 ? itemName.substring(0, 4) + '...' : itemName}
          </text>
        )}
        {width > 15 && height > 10 && width <= 25 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="6"
            fontWeight="400"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {itemName.substring(0, 3)}
          </text>
        )}
        {width > 10 && height > 8 && width <= 15 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="5"
            fontWeight="400"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {itemName.substring(0, 2)}
          </text>
        )}
        {width >= 5 && height >= 5 && width <= 10 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="4"
            fontWeight="400"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            {itemName.substring(0, 1)}
          </text>
        )}
      </g>
    );
  };

  return (
    <Card sx={{ height: 400 }}>
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Composition du patrimoine
        </Typography>
        <Box sx={{ flex: 1, minHeight: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              width={400}
              height={300}
              data={data}
              dataKey="size"
              aspectRatio={4 / 3}
              stroke="none"
              fill="#D4AF37"
              content={<CustomContent />}
            >
              <Tooltip content={<CustomTooltip />} />
            </Treemap>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WealthCompositionChart;