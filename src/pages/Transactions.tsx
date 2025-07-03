import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  InputAdornment,
  useTheme,
  Grid,
} from '@mui/material';
import { Search, TrendingUp, TrendingDown, DateRange } from '@mui/icons-material';

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

const Transactions: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const transactions: Transaction[] = [
    {
      id: '1',
      date: '2024-01-15',
      description: 'Salaire',
      category: 'Revenus',
      amount: 4200,
      type: 'income',
    },
    {
      id: '2',
      date: '2024-01-14',
      description: 'Courses Carrefour',
      category: 'Alimentation',
      amount: -85.50,
      type: 'expense',
    },
    {
      id: '3',
      date: '2024-01-13',
      description: 'Essence',
      category: 'Transport',
      amount: -65.00,
      type: 'expense',
    },
    {
      id: '4',
      date: '2024-01-12',
      description: 'Loyer',
      category: 'Logement',
      amount: -1200,
      type: 'expense',
    },
    {
      id: '5',
      date: '2024-01-11',
      description: 'Netflix',
      category: 'Loisirs',
      amount: -12.99,
      type: 'expense',
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const transactionDate = new Date(transaction.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    
    const matchesDateRange = 
      (!start || transactionDate >= start) &&
      (!end || transactionDate <= end);
    
    return matchesSearch && matchesDateRange;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Revenus': theme.palette.success.main,
      'Alimentation': theme.palette.primary.main,
      'Transport': theme.palette.secondary.main,
      'Logement': theme.palette.warning.main,
      'Loisirs': theme.palette.error.main,
    };
    return colors[category] || theme.palette.text.secondary;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Transactions
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                placeholder="Rechercher une transaction..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: theme.palette.text.secondary }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <TextField
                fullWidth
                label="Date de début"
                type="date"
                variant="outlined"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <DateRange sx={{ color: theme.palette.text.secondary }} />
                      </InputAdornment>
                    ),
                    endAdornment: null,
                  },
                }}
                sx={{
                  '& input[type="date"]::-webkit-calendar-picker-indicator': {
                    display: 'none',
                  },
                  '& input[type="date"]::-webkit-inner-spin-button': {
                    display: 'none',
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 6, md: 4 }}>
              <TextField
                fullWidth
                label="Date de fin"
                type="date"
                variant="outlined"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                  input: {
                    endAdornment: null,
                  },
                }}
                sx={{
                  '& input[type="date"]::-webkit-calendar-picker-indicator': {
                    display: 'none',
                  },
                  '& input[type="date"]::-webkit-inner-spin-button': {
                    display: 'none',
                  },
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Catégorie</TableCell>
                <TableCell align="right">Montant</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(79, 70, 229, 0.05)',
                    },
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {formatDate(transaction.date)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {transaction.type === 'income' ? (
                        <TrendingUp sx={{ color: theme.palette.success.main, fontSize: 20 }} />
                      ) : (
                        <TrendingDown sx={{ color: theme.palette.error.main, fontSize: 20 }} />
                      )}
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {transaction.description}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={transaction.category}
                      size="small"
                      sx={{
                        backgroundColor: `${getCategoryColor(transaction.category)}20`,
                        color: getCategoryColor(transaction.category),
                        borderRadius: '8px',
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: transaction.type === 'income' 
                          ? theme.palette.success.main 
                          : theme.palette.error.main,
                      }}
                    >
                      {transaction.amount > 0 ? '+' : ''}€{Math.abs(transaction.amount).toLocaleString()}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default Transactions;