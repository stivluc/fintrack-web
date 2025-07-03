import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D4AF37',
      light: '#F4E976',
      dark: '#B8860B',
    },
    secondary: {
      main: '#CD7F32',
      light: '#E6A85C',
      dark: '#8B4513',
    },
    background: {
      default: '#0D1117',
      paper: '#161B22',
    },
    text: {
      primary: '#F0F6FC',
      secondary: '#8B949E',
    },
    divider: '#21262D',
    error: {
      main: '#F85149',
    },
    warning: {
      main: '#D29922',
    },
    info: {
      main: '#58A6FF',
    },
    success: {
      main: '#3FB950',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#F8FAFC',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#F8FAFC',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#F8FAFC',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#F8FAFC',
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: '#F8FAFC',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#F8FAFC',
    },
    body1: {
      fontSize: '1rem',
      color: '#CBD5E1',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#94A3B8',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(22, 27, 34, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(212, 175, 55, 0.15)',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
          '&:hover': {
            border: '1px solid rgba(212, 175, 55, 0.25)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(212, 175, 55, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #D4AF37 0%, #F4E976 100%)',
          color: '#000',
          '&:hover': {
            background: 'linear-gradient(135deg, #B8860B 0%, #D4AF37 100%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(22, 27, 34, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(212, 175, 55, 0.15)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(13, 17, 23, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgba(13, 17, 23, 0.98)',
          backdropFilter: 'blur(20px)',
          border: 'none',
          borderRight: '1px solid rgba(212, 175, 55, 0.2)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          margin: '2px 12px',
          '&:hover': {
            background: 'rgba(212, 175, 55, 0.1)',
          },
          '&.Mui-selected': {
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(205, 127, 50, 0.1) 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(205, 127, 50, 0.2) 100%)',
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#D4AF37',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          '&.MuiChip-colorPrimary': {
            background: 'linear-gradient(135deg, #D4AF37 0%, #F4E976 100%)',
            color: '#000',
          },
          '&.MuiChip-colorSecondary': {
            background: 'linear-gradient(135deg, #CD7F32 0%, #E6A85C 100%)',
            color: '#000',
          },
        },
      },
    },
  },
});

export default theme;