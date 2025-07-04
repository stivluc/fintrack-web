import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent } from '@mui/material';
import apiService from './services/api';

const DebugDateFilters: React.FC = () => {
  const [startDate, setStartDate] = useState('2025-06-01');
  const [endDate, setEndDate] = useState('2025-06-30');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testFilters = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Testing date filters with params:', {
        date_gte: startDate,
        date_lte: endDate,
        page: 1,
        limit: 10
      });
      
      const response = await apiService.getTransactions({
        date_gte: startDate,
        date_lte: endDate,
        page: 1,
        limit: 10
      });
      
      console.log('✅ API Response:', response);
      setResult(response);
    } catch (err: any) {
      console.error('❌ API Error:', err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const testWithoutFilters = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Testing without filters');
      
      const response = await apiService.getTransactions({
        page: 1,
        limit: 10
      });
      
      console.log('✅ API Response (no filters):', response);
      setResult(response);
    } catch (err: any) {
      console.error('❌ API Error:', err);
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        🔧 Debug Date Filters
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Date de début"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          label="Date de fin"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Box>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Button 
          variant="contained" 
          onClick={testFilters}
          disabled={loading}
        >
          Test avec filtres
        </Button>
        <Button 
          variant="outlined" 
          onClick={testWithoutFilters}
          disabled={loading}
        >
          Test sans filtres
        </Button>
      </Box>
      
      {loading && <Typography>Chargement...</Typography>}
      
      {error && (
        <Card sx={{ mb: 2, backgroundColor: '#ffebee' }}>
          <CardContent>
            <Typography color="error">❌ Erreur: {error}</Typography>
          </CardContent>
        </Card>
      )}
      
      {result && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              📊 Résultat:
            </Typography>
            <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(result, null, 2)}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default DebugDateFilters;