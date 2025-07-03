import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Badge,
} from '@mui/material';
import {
  Menu,
  Notifications,
} from '@mui/icons-material';
import Breadcrumbs from '../common/Breadcrumbs';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: theme.zIndex.drawer - 1, // Lower than sidebar
        background: 'transparent',
        boxShadow: 'none',
        borderBottom: 'none',
        left: { xs: 0, md: '280px' }, // Start after sidebar on desktop
        width: { xs: '100%', md: 'calc(100% - 280px)' }, // Take remaining width
      }}
    >
      <Toolbar sx={{ py: 1, minHeight: '64px !important' }}>
        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ 
              mr: 2,
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              '&:hover': {
                background: 'rgba(212, 175, 55, 0.2)',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <Menu sx={{ color: theme.palette.primary.main }} />
          </IconButton>
        )}
        
        <Box sx={{ flexGrow: 1 }}>
          <Breadcrumbs />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            color="inherit"
            sx={{
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid rgba(212, 175, 55, 0.2)',
              '&:hover': {
                background: 'rgba(212, 175, 55, 0.2)',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <Badge 
              badgeContent={3} 
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F4E976 100%)',
                  color: '#000',
                  fontWeight: 600,
                },
              }}
            >
              <Notifications sx={{ color: theme.palette.primary.main }} />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;