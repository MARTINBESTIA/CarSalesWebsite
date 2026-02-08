import { useState } from 'react'
import './App.css'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { NavBar } from '../components/NavBar';
import { HomePage } from '../components/HomePage';
import { SearchResultsPage } from '../components/SearchResultsPage';
import { CarDetailPage } from '../components/CarDetailPage';
import { SignInPage } from '../components/SignInPage';
import { SignUpPage } from '../components/SignUpPage';
import { DashboardPage } from '../components/DashboardPage';
import { AddListingPage } from '../components/AddListingPage';

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
    borderRadius: 0, 
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
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [userData, setUserData] = useState(() => {
    const raw = localStorage.getItem('userData');
    return raw ? JSON.parse(raw) : null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('isLoggedIn'));
  const [dashboardSection, setDashboardSection] = useState(null);

  const handleNavigate = (page, dataOrCarId) => {
    setCurrentPage(page);

    // If second parameter is an object with user data, store it and mark logged in
    if (dataOrCarId && typeof dataOrCarId === 'object' && dataOrCarId.firstName) {
      setUserData(dataOrCarId);
      setIsLoggedIn(true);
      localStorage.setItem('userData', JSON.stringify(dataOrCarId));
      localStorage.setItem('isLoggedIn', '1');
    } 
    // If second param is an object indicating a dashboard section
    else if (dataOrCarId && typeof dataOrCarId === 'object' && dataOrCarId.section) {
      setDashboardSection(dataOrCarId.section);
    }
    // Otherwise, if number -> carId
    else if (dataOrCarId !== undefined && typeof dataOrCarId === 'number') {
      setSelectedCarId(dataOrCarId);
    } else if (page === 'addListing') {
      // if navigating to addListing without an id, ensure we clear selectedCarId so AddListingPage works as "create"
      if (typeof dataOrCarId === 'number') setSelectedCarId(dataOrCarId);
      else setSelectedCarId(null);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUserData(null);
    setIsLoggedIn(false);
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    setCurrentPage('home');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {currentPage !== 'signin' && currentPage !== 'signup' && currentPage !== 'addListing' && (
        <NavBar 
          onNavigate={handleNavigate} 
          currentPage={currentPage} 
          isLoggedIn={isLoggedIn}
          userData={userData}
          onLogout={handleLogout}
          onOpenDashboardSection={(section) => {
            setDashboardSection(section);
            setCurrentPage('dashboard');
          }}
        />
      )}
      
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'search' && <SearchResultsPage onNavigate={handleNavigate} />}
      {currentPage === 'detail' && <CarDetailPage carId={selectedCarId} />}
      {currentPage === 'signin' && <SignInPage onNavigate={handleNavigate} />}
      {currentPage === 'signup' && <SignUpPage onNavigate={handleNavigate} />}
      {currentPage === 'dashboard' && (
        <DashboardPage 
          onNavigate={handleNavigate} 
          userData={userData} 
          initialSection={dashboardSection}
        />
      )}
      {currentPage === 'addListing' && <AddListingPage onNavigate={handleNavigate} listingId={selectedCarId} />}
    </ThemeProvider>
  );
}