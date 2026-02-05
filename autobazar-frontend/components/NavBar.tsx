import { AppBar, Toolbar, Container, Button, Box, Typography } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

interface NavBarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function NavBar({ onNavigate, currentPage }: NavBarProps) {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: 'primary.main',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderRadius: 0,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box 
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
            onClick={() => onNavigate('home')}
          >
            <DirectionsCarIcon sx={{ mr: 1, fontSize: 32 }} />
            <Typography variant="h6">
              AutoHub
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Button 
              color="inherit" 
              onClick={() => onNavigate('search')}
              sx={{ 
                textTransform: 'none',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Buy a car
            </Button>
            <Button 
              color="inherit"
              sx={{ 
                textTransform: 'none',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              How it works
            </Button>
            <Button 
              color="inherit"
              sx={{ 
                textTransform: 'none',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Services
            </Button>
            <Button 
              color="inherit"
              sx={{ 
                textTransform: 'none',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Contact
            </Button>
            <Button 
              variant="contained"
              color="secondary"
              onClick={() => onNavigate('signin')}
              sx={{ 
                textTransform: 'none',
                ml: 2,
                borderRadius: '8px',
                px: 3
              }}
            >
              Sign in
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
