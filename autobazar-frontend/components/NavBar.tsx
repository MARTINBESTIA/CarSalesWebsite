import { AppBar, Toolbar, Container, Button, Box, Typography } from '@mui/material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';

interface NavBarProps {
  onNavigate: (page: string, payload?: any) => void;
  currentPage: string;
  isLoggedIn?: boolean;
  userData?: any;
  onLogout?: () => void;
  onOpenDashboardSection?: (section: string) => void;
}

export function NavBar({ onNavigate, currentPage, isLoggedIn, onLogout, onOpenDashboardSection }: NavBarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

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

            {!isLoggedIn && (
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
            )}

            {isLoggedIn && (
              <>
                <IconButton
                  onClick={openMenu}
                  size="large"
                  sx={{ color: 'inherit', ml: 2 }}
                >
                  <AccountCircleIcon />
                  <ArrowDropDownIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={closeMenu}
                >
                  <MenuItem onClick={() => { closeMenu(); onOpenDashboardSection?.('profile'); }}>
                    My Profile
                  </MenuItem>
                  <MenuItem onClick={() => { closeMenu(); onOpenDashboardSection?.('listings'); }}>
                    My listings
                  </MenuItem>
                  <MenuItem onClick={() => { closeMenu(); onLogout?.(); }}>
                    Log out
                  </MenuItem>
                </Menu>
              </>
            )}
           </Box>
         </Toolbar>
       </Container>
     </AppBar>
   );
 }
