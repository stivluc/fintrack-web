import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Typography, Link, useTheme } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();

  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap: { [key: string]: string } = {
    '': 'Dashboard',
    'transactions': 'Transactions',
    'budgets': 'Budgets', 
    'analytics': 'Analytics',
    'settings': 'Paramètres',
    'about': 'À propos',
    'profile': 'Profil',
  };

  return (
    <MuiBreadcrumbs
      aria-label="breadcrumb"
      sx={{
        '& .MuiBreadcrumbs-separator': {
          color: theme.palette.text.secondary,
        },
      }}
    >
      {location.pathname === '/' ? (
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.text.primary,
            fontSize: '0.875rem',
            fontWeight: 600,
          }}
        >
          Accueil
        </Typography>
      ) : (
        <Link
          component={RouterLink}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.text.secondary,
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            '&:hover': {
              color: theme.palette.primary.main,
            },
          }}
        >
          Accueil
        </Link>
      )}
      
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const displayName = breadcrumbNameMap[value] || value;

        return last ? (
          <Typography
            key={to}
            sx={{
              color: theme.palette.text.primary,
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            {displayName}
          </Typography>
        ) : (
          <Link
            key={to}
            component={RouterLink}
            to={to}
            sx={{
              color: theme.palette.text.secondary,
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          >
            {displayName}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;