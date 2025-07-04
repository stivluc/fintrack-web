import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Badge,
  Popover,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Menu,
  Notifications,
  TrendingUp,
  Warning,
  Info,
} from '@mui/icons-material';
import Breadcrumbs from '../common/Breadcrumbs';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const [showAlert, setShowAlert] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Budget dépassé',
      message: 'Votre budget Transport a été dépassé de 15%',
      type: 'warning',
      icon: <Warning />,
      time: '2h',
    },
    {
      id: 2,
      title: 'Nouveau revenu',
      message: 'Salaire de janvier crédité: €4,200',
      type: 'success',
      icon: <TrendingUp />,
      time: '1j',
    },
    {
      id: 3,
      title: 'Rappel',
      message: 'Prélèvement loyer prévu demain',
      type: 'info',
      icon: <Info />,
      time: '3j',
    },
  ];

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleNotificationItemClick = () => {
    setShowAlert(true);
    handleNotificationClose();
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning':
        return theme.palette.warning.main;
      case 'success':
        return theme.palette.success.main;
      case 'info':
        return theme.palette.info.main;
      default:
        return theme.palette.text.secondary;
    }
  };

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
            onClick={handleNotificationClick}
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
              badgeContent={notifications.length} 
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
        
        <Popover
          open={Boolean(notificationAnchor)}
          anchorEl={notificationAnchor}
          onClose={handleNotificationClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              width: 350,
              maxHeight: 400,
              mt: 1,
              background: 'rgba(35, 35, 35, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 175, 55, 0.15)',
              borderRadius: '12px',
            }
          }}
        >
          <Box sx={{ paddingLeft: 2, py: 1, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Notifications
            </Typography>
          </Box>
          <List sx={{ p: 0 }}>
            {notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  onClick={handleNotificationItemClick}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      background: 'rgba(212, 175, 55, 0.1)',
                    },
                    py: 1,
                  }}
                >
                  <ListItemIcon>
                    <Box sx={{ color: getNotificationColor(notification.type) }}>
                      {notification.icon}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {notification.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                          {notification.time}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>
                        {notification.message}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />}
              </React.Fragment>
            ))}
          </List>
        </Popover>

        <Snackbar
          open={showAlert}
          autoHideDuration={4000}
          onClose={() => setShowAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setShowAlert(false)} 
            severity="info" 
            sx={{ 
              borderRadius: '12px',
              background: 'rgba(35, 35, 35, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(88, 166, 255, 0.3)',
            }}
          >
            La gestion des notifications n'est pas développée pour la démo
          </Alert>
        </Snackbar>
      </Toolbar>
    </AppBar>
  );
};

export default Header;