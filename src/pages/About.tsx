import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  useTheme,
  Divider 
} from '@mui/material';
import { 
  Code, 
  Storage, 
  Web, 
  PhoneAndroid, 
  Api, 
  Timeline 
} from '@mui/icons-material';

const About: React.FC = () => {
  const theme = useTheme();

  const technologies = [
    { name: 'Django', icon: <Code />, color: theme.palette.success.main },
    { name: 'PostgreSQL', icon: <Storage />, color: theme.palette.info.main },
    { name: 'React', icon: <Web />, color: theme.palette.primary.main },
    { name: 'React Native', icon: <PhoneAndroid />, color: theme.palette.secondary.main },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        À propos
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Timeline sx={{ fontSize: 32, color: theme.palette.primary.main, mr: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  FinTrack - Gestionnaire Financier
                </Typography>
              </Box>
              
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                FinTrack est une application de gestion financière personnelle développée dans le cadre 
                d'un projet d'apprentissage technologique. Cette plateforme permet de suivre ses revenus, 
                dépenses, budgets et d'analyser ses habitudes financières.
              </Typography>

              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Objectif du projet
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                Ce projet a été conçu pour s'entraîner et maîtriser un stack technologique moderne 
                incluant le développement backend avec Django, la gestion de base de données avec 
                PostgreSQL, et le développement frontend avec React pour le web et React Native 
                pour l'application mobile.
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                État actuel
              </Typography>
              
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                L'interface web utilise désormais des données générées par l'API Django avec 
                PostgreSQL comme base de données. Le système génère automatiquement des données 
                de démonstration réalistes incluant des transactions, comptes bancaires, budgets 
                et suivi patrimonial pour illustrer les fonctionnalités de l'application.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Technologies utilisées
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {technologies.map((tech, index) => (
                  <Box 
                    key={index}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      p: 2,
                      borderRadius: '12px',
                      background: `${tech.color}10`,
                      border: `1px solid ${tech.color}30`
                    }}
                  >
                    <Box sx={{ color: tech.color, mr: 2, display: 'flex'}}>
                      {tech.icon}
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {tech.name}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Prochaines étapes
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Api sx={{ fontSize: 16, color: theme.palette.warning.main, mr: 1 }} />
                  <Typography variant="body2">
                    Connexion API Django
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Storage sx={{ fontSize: 16, color: theme.palette.info.main, mr: 1 }} />
                  <Typography variant="body2">
                    Integration PostgreSQL
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneAndroid sx={{ fontSize: 16, color: theme.palette.secondary.main, mr: 1 }} />
                  <Typography variant="body2">
                    Application mobile
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default About;