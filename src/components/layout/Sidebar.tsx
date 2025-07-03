import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  Dashboard,
  Receipt,
  AccountBalance,
  Analytics,
  Settings,
  TrendingUp,
  Info,
  Person,
  Logout,
  ExpandMore,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant?: 'permanent' | 'temporary';
}

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/' },
  { text: 'Transactions', icon: <Receipt />, path: '/transactions' },
  { text: 'Budgets', icon: <AccountBalance />, path: '/budgets' },
  { text: 'Analytics', icon: <Analytics />, path: '/analytics' },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose, variant = 'permanent' }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleNavigation = (path: string) => {
    navigate(path);
    if (variant === 'temporary') {
      onClose();
    }
  };

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
  };

  const handleProfile = () => {
    navigate('/profile');
    handleUserMenuClose();
  };

  const drawerContent = (
    <Box sx={{ width: 280, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #D4AF37 0%, #F4E976 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
          }}
        >
          <TrendingUp sx={{ color: '#000', fontSize: 26, fontWeight: 'bold' }} />
        </Box>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 800, 
            color: theme.palette.text.primary,
            letterSpacing: '-0.02em',
          }}
        >
          FinTrack
        </Typography>
      </Box>

      <Box sx={{ px: 3, mb: 3 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            color: theme.palette.text.secondary,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 600,
          }}
        >
          Navigation
        </Typography>
      </Box>

      <List sx={{ flex: 1, px: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => handleNavigation(item.path)}
            sx={{
              mb: 1,
              py: 1.5,
              borderRadius: '8px',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateX(4px)',
              },
              '&.Mui-selected': {
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(205, 127, 50, 0.08) 100%)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
                '& .MuiListItemText-primary': {
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                },
              },
            }}
          >
            <ListItemIcon 
              sx={{ 
                color: theme.palette.text.secondary,
                minWidth: 40,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: 600,
                fontSize: '0.95rem',
                letterSpacing: '-0.01em',
              }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* Settings and About Section */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography 
          variant="caption" 
          sx={{ 
            color: theme.palette.text.secondary,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 600,
            px: 2,
            mb: 1,
            display: 'block',
          }}
        >
          Options
        </Typography>
        
        <ListItemButton 
          onClick={() => handleNavigation('/settings')}
          sx={{
            borderRadius: '8px',
            py: 1.5,
            mb: 1,
            '&:hover': {
              background: 'rgba(212, 175, 55, 0.05)',
            },
          }}
        >
          <ListItemIcon sx={{ color: theme.palette.text.secondary, minWidth: 40 }}>
            <Settings />
          </ListItemIcon>
          <ListItemText 
            primary="Paramètres"
            primaryTypographyProps={{
              fontWeight: 600,
              fontSize: '0.95rem',
              letterSpacing: '-0.01em',
            }}
          />
        </ListItemButton>

        <ListItemButton 
          onClick={() => handleNavigation('/about')}
          sx={{
            borderRadius: '8px',
            py: 1.5,
            '&:hover': {
              background: 'rgba(212, 175, 55, 0.05)',
            },
          }}
        >
          <ListItemIcon sx={{ color: theme.palette.text.secondary, minWidth: 40 }}>
            <Info />
          </ListItemIcon>
          <ListItemText 
            primary="À propos"
            primaryTypographyProps={{
              fontWeight: 600,
              fontSize: '0.95rem',
              letterSpacing: '-0.01em',
            }}
          />
        </ListItemButton>
      </Box>

      {/* User Section */}
      <Box sx={{ p: 2, mt: 'auto' }}>
        <ListItemButton 
          onClick={handleUserMenuClick}
          sx={{
            borderRadius: '8px',
            py: 2,
            background: 'rgba(212, 175, 55, 0.08)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            '&:hover': {
              background: 'rgba(212, 175, 55, 0.15)',
            },
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              background: 'linear-gradient(135deg, #D4AF37 0%, #F4E976 100%)',
              color: '#000',
              fontWeight: 700,
              fontSize: '0.875rem',
              mr: 2,
            }}
          >
            {user?.name?.charAt(0) || 'U'}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 600, 
                color: theme.palette.text.primary,
                fontSize: '0.9rem',
              }}
            >
              {user?.name}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: theme.palette.text.secondary,
                fontSize: '0.75rem',
              }}
            >
              {user?.email}
            </Typography>
          </Box>
          <ExpandMore sx={{ color: theme.palette.text.secondary, fontSize: 20 }} />
        </ListItemButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleUserMenuClose}
          PaperProps={{
            sx: {
              width: 200,
              mt: 1,
            },
          }}
        >
          <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            Profil
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: theme.palette.error.main }}>
            <ListItemIcon>
              <Logout fontSize="small" sx={{ color: theme.palette.error.main }} />
            </ListItemIcon>
            Déconnexion
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          border: 'none',
          boxShadow: variant === 'permanent' ? '4px 0 20px rgba(0, 0, 0, 0.5)' : '0 8px 32px rgba(0, 0, 0, 0.3)',
          zIndex: theme.zIndex.drawer,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;