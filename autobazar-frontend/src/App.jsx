import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { NavBar } from '../components/NavBar';
import { HomePage } from '../components/HomePage';
import { SearchResultsPage } from '../components/SearchResultsPage';
import { CarDetailPage } from '../components/CarDetailPage';
import { SignInPage } from '../components/SignInPage';
import { SignUpPage } from '../components/SignUpPage';
import { DashboardPage } from '../components/DashboardPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a2332', // Deep navy blue
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff6f00', // Warm orange
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCarId, setSelectedCarId] = useState(1);
  const [userData, setUserData] = useState(null);

  const handleNavigate = (page, dataOrCarId) => {
    setCurrentPage(page);
    
    // If second parameter is an object with user data, store it
    if (dataOrCarId && typeof dataOrCarId === 'object' && dataOrCarId.firstName) {
      setUserData(dataOrCarId);
    } 
    // Otherwise, treat it as a carId
    else if (dataOrCarId !== undefined && typeof dataOrCarId === 'number') {
      setSelectedCarId(dataOrCarId);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {currentPage !== 'signin' && currentPage !== 'signup' && (
        <NavBar onNavigate={handleNavigate} currentPage={currentPage} />
      )}
      
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'search' && <SearchResultsPage onNavigate={handleNavigate} />}
      {currentPage === 'detail' && <CarDetailPage carId={selectedCarId} />}
      {currentPage === 'signin' && <SignInPage onNavigate={handleNavigate} />}
      {currentPage === 'signup' && <SignUpPage onNavigate={handleNavigate} />}
      {currentPage === 'dashboard' && <DashboardPage onNavigate={handleNavigate} userData={userData} />}
    </ThemeProvider>
  );
}