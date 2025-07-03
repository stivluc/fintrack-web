import React from 'react';
import { Box, Typography, Card, CardContent, Alert, useTheme } from '@mui/material';
import { Construction } from '@mui/icons-material';

const Settings: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Paramètres
      </Typography>

      <Card sx={{ maxWidth: 600, mx: 'auto', mt: 8 }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: `${theme.palette.warning.main}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            <Construction sx={{ fontSize: 40, color: theme.palette.warning.main }} />
          </Box>
          
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Page en développement
          </Typography>
          
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
            Cette section n'est pas encore disponible dans la version de démonstration.
            Les paramètres permettront de configurer les préférences utilisateur,
            les notifications et les paramètres de sécurité.
          </Typography>

          <Alert 
            severity="info" 
            sx={{ 
              borderRadius: '12px',
              textAlign: 'left'
            }}
          >
            Fonctionnalités prévues : gestion du profil, préférences d'affichage, 
            notifications, sécurité et confidentialité.
          </Alert>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;