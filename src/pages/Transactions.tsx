import React, { useState, useMemo } from 'react';
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
  TableSortLabel,
  Chip,
  TextField,
  InputAdornment,
  useTheme,
  Grid,
  Alert,
  Pagination,
} from '@mui/material';
import { Search, TrendingUp, TrendingDown, DateRange } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { TransactionsSkeleton } from '../components/common/LoadingSkeletons';
import apiService, { Transaction } from '../services/api'; // eslint-disable-line no-unused-vars

const Transactions: React.FC = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState<string>('date');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  
  const pageSize = 20;

  // Build query parameters
  const queryParams = useMemo(() => {
    const params: any = {
      page,
      limit: pageSize,
      ordering: order === 'desc' ? `-${orderBy}` : orderBy,
    };
    
    if (searchTerm) {
      params.search = searchTerm;
    }
    
    if (startDate) {
      params.date_gte = startDate;
    }
    
    if (endDate) {
      params.date_lte = endDate;
    }
    
    return params;
  }, [searchTerm, startDate, endDate, page, orderBy, order]);

  const { data: transactionsData, isLoading, error } = useQuery({
    queryKey: ['transactions', queryParams],
    queryFn: () => apiService.getTransactions(queryParams),
    placeholderData: (previousData) => previousData, // Keep previous data while loading new page
  });

  const transactions = transactionsData?.results || [];
  const totalCount = transactionsData?.count || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(Math.abs(amount));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1); // Reset to first page when searching
  };

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    if (field === 'start') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
    setPage(1); // Reset to first page when filtering
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setPage(1); // Reset to first page when sorting
  };

  const createSortHandler = (property: string) => () => {
    handleRequestSort(property);
  };

  if (isLoading) {
    return <TransactionsSkeleton />;
  }

  if (error) {
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          Transactions
        </Typography>
        <Alert severity="error" sx={{ mb: 3 }}>
          Erreur lors du chargement des transactions. Veuillez réessayer.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Transactions
        {totalCount > 0 && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            {totalCount} transaction{totalCount > 1 ? 's' : ''} au total
          </Typography>
        )}
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
                onChange={(e) => handleSearchChange(e.target.value)}
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
                onChange={(e) => handleDateChange('start', e.target.value)}
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
                onChange={(e) => handleDateChange('end', e.target.value)}
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
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'date'}
                    direction={orderBy === 'date' ? order : 'asc'}
                    onClick={createSortHandler('date')}
                    sx={{
                      fontWeight: 600,
                      '&.Mui-active': {
                        color: theme.palette.primary.main,
                      },
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'description'}
                    direction={orderBy === 'description' ? order : 'asc'}
                    onClick={createSortHandler('description')}
                    sx={{
                      fontWeight: 600,
                      '&.Mui-active': {
                        color: theme.palette.primary.main,
                      },
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    Description
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'category__name'}
                    direction={orderBy === 'category__name' ? order : 'asc'}
                    onClick={createSortHandler('category__name')}
                    sx={{
                      fontWeight: 600,
                      '&.Mui-active': {
                        color: theme.palette.primary.main,
                      },
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    Catégorie
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'account__name'}
                    direction={orderBy === 'account__name' ? order : 'asc'}
                    onClick={createSortHandler('account__name')}
                    sx={{
                      fontWeight: 600,
                      '&.Mui-active': {
                        color: theme.palette.primary.main,
                      },
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    Compte
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === 'amount'}
                    direction={orderBy === 'amount' ? order : 'asc'}
                    onClick={createSortHandler('amount')}
                    sx={{
                      fontWeight: 600,
                      '&.Mui-active': {
                        color: theme.palette.primary.main,
                      },
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    Montant
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Aucune transaction trouvée
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) => (
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
                        {transaction.category.type === 'INCOME' ? (
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
                        label={transaction.category.name}
                        size="small"
                        sx={{
                          backgroundColor: `${transaction.category.color}20`,
                          color: transaction.category.color,
                          borderRadius: '8px',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {transaction.account.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 600,
                          color: transaction.category.type === 'INCOME' 
                            ? theme.palette.success.main 
                            : theme.palette.error.main,
                        }}
                      >
                        {transaction.category.type === 'INCOME' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default Transactions;