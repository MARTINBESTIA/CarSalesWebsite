import { 
  Container, 
  Box, 
  Typography, 
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useState, useEffect } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import { mockCars } from '../utils/mockData';

interface DashboardPageProps {
  onNavigate: (page: string, carId?: number) => void;
  userData?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  initialSection?: string | null;
}

export function DashboardPage({ onNavigate, userData, initialSection }: DashboardPageProps) {
  const [selectedSection, setSelectedSection] = useState(initialSection || 'profile');
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [profileData, setProfileData] = useState({
    firstName: userData?.firstName || 'John',
    lastName: userData?.lastName || 'Doe',
    email: userData?.email || 'john.doe@example.com',
    phone: userData?.phone || '+1 (555) 123-4567'
  });

  useEffect(() => {
    if (userData) {
      setProfileData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone
      });
    }
  }, [userData]);

  useEffect(() => {
    if (initialSection) {
      setSelectedSection(initialSection);
    }
  }, [initialSection]);

  const savedCars = mockCars.slice(0, 3);
  const listings = mockCars.slice(3, 5);

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${encodeURIComponent(profileData.email)}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      console.log('User deleted successfully');
      onNavigate('home');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const payload = {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        phone: profileData.phone,
        password: ''
      };

      const response = await fetch(
        `http://localhost:8080/api/users/${encodeURIComponent(profileData.email)}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        throw new Error('Update failed');
      }

      console.log('Profile updated successfully');
      setIsEditing(false);
      setSubmitError('');
    } catch (error) {
      console.error('Error:', error);
      setSubmitError('Failed to update profile. Please try again.');
    }
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          My Account
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: '100%', maxWidth: 1000 }}>
            {selectedSection === 'profile' && (
              <Paper sx={{ p: 4, borderRadius: '12px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                  <Typography variant="h5">
                    Profile Information
                  </Typography>
                  <Button
                    variant={isEditing ? 'contained' : 'outlined'}
                    color={isEditing ? 'secondary' : 'primary'}
                    onClick={() => {
                      if (isEditing) {
                        handleSaveProfile();
                      } else {
                        setIsEditing(true);
                        setSubmitError('');
                      }
                    }}
                    sx={{ 
                      borderRadius: '8px',
                      textTransform: 'none'
                    }}
                  >
                    {isEditing ? 'Save changes' : 'Edit profile'}
                  </Button>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First name"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last name"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={profileData.email}
                      disabled={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone number"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                    />
                  </Grid>
                </Grid>

                {submitError && (
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#d32f2f',
                      mt: 2,
                      mb: 2
                    }}
                  >
                    {submitError}
                  </Typography>
                )}

                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => setOpenDeleteDialog(true)}
                  sx={{ 
                    mt: 4,
                    borderRadius: '8px',
                    textTransform: 'none'
                  }}
                >
                  Delete account
                </Button>
              </Paper>
            )}

            {selectedSection === 'saved' && (
              <Box>
                <Paper sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    Saved Cars
                  </Typography>
                  <Typography color="text.secondary">
                    {savedCars.length} cars saved
                  </Typography>
                </Paper>

                <Grid container spacing={3}>
                  {savedCars.map((car) => (
                    <Grid item xs={12} key={car.id}>
                      <Card 
                        sx={{ 
                          display: 'flex',
                          borderRadius: '12px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{ width: 240, objectFit: 'cover' }}
                          image={car.image}
                          alt={`${car.brand} ${car.model}`}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                          <CardContent sx={{ flex: '1 0 auto' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                              <Box>
                                <Typography variant="h6">
                                  {car.brand} {car.model}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                  <Chip label={car.year} size="small" />
                                  <Chip label={`${car.mileage.toLocaleString()} mi`} size="small" />
                                  <Chip label={car.fuel} size="small" />
                                </Box>
                              </Box>
                              <IconButton color="error" size="small">
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                            <Typography variant="h5" sx={{ color: 'secondary.main', mb: 2 }}>
                              ${car.price.toLocaleString()}
                            </Typography>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => onNavigate('detail', car.id)}
                              sx={{
                                borderRadius: '8px',
                                textTransform: 'none'
                              }}
                            >
                              View details
                            </Button>
                          </CardContent>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {selectedSection === 'listings' && (
              <Box>
                <Paper sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    My Listings
                  </Typography>
                  <Typography color="text.secondary">
                    {listings.length} active listings
                  </Typography>
                </Paper>

                <Grid container spacing={3}>
                  {listings.map((car) => (
                    <Grid item xs={12} key={car.id}>
                      <Card 
                        sx={{ 
                          display: 'flex',
                          borderRadius: '12px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{ width: 240, objectFit: 'cover' }}
                          image={car.image}
                          alt={`${car.brand} ${car.model}`}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                          <CardContent sx={{ flex: '1 0 auto' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                              <Box>
                                <Typography variant="h6">
                                  {car.brand} {car.model}
                                </Typography>
                                <Chip 
                                  label="Reserved" 
                                  color="success" 
                                  size="small" 
                                  sx={{ mt: 1 }} 
                                />
                              </Box>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              Reserved on: November 25, 2024
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              Expected delivery: December 5, 2024
                            </Typography>
                            <Typography variant="h5" sx={{ color: 'secondary.main', mb: 2 }}>
                              ${car.price.toLocaleString()}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => onNavigate('detail', car.id)}
                                sx={{
                                  borderRadius: '8px',
                                  textTransform: 'none'
                                }}
                              >
                                View details
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                sx={{
                                  borderRadius: '8px',
                                  textTransform: 'none'
                                }}
                              >
                                Cancel reservation
                              </Button>
                            </Box>
                          </CardContent>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {selectedSection === 'settings' && (
              <Paper sx={{ p: 4, borderRadius: '12px' }}>
                <Typography variant="h5" sx={{ mb: 4 }}>
                  Account Settings
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Change Password
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Current password"
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="New password"
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Confirm new password"
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          borderRadius: '8px',
                          textTransform: 'none'
                        }}
                      >
                        Update password
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Notifications
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography>Email notifications</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Receive updates about your listings and saved cars
                        </Typography>
                      </Box>
                      <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                        Enabled
                      </Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography>Marketing emails</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Receive promotional offers and deals
                        </Typography>
                      </Box>
                      <Button variant="outlined" size="small" sx={{ textTransform: 'none' }}>
                        Disabled
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            )}
          </Box>
        </Box>
      </Container>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography sx={{ mt: 2 }}>
            Are you sure you want to delete your account? This action cannot be undone. All your data, saved cars, and listings will be permanently deleted.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpenDeleteDialog(false)}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={() => {
              setOpenDeleteDialog(false);
              handleDeleteUser();
            }}
            color="error"
            variant="contained"
            sx={{ textTransform: 'none' }}
          >
            Delete account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
