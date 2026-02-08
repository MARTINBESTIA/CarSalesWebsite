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
import DeleteIcon from '@mui/icons-material/Delete';
import { mockCars } from '../utils/mockData';
import { API_BASE } from '../src/api';

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
  const [listingsData, setListingsData] = useState<any[]>([]);
  const [loadingListings, setLoadingListings] = useState(false);

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

  // Extract userId helper (same heuristic as AddListingPage)
  function getLocalUserId(): number {
    let userId = 1;
    try {
      const raw = localStorage.getItem('userData');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && (parsed.id || parsed.userId)) {
          userId = parsed.id || parsed.userId;
        }
      }
    } catch (e) {
      // ignore
    }
    return userId;
  }

  useEffect(() => {
    function loadListings() {
      const userId = getLocalUserId();
      setLoadingListings(true);
      fetch(`${API_BASE}/api/listings/user/${userId}`)
        .then((res) => {
          if (!res.ok) {
            console.error('Failed to load listings for user', userId);
            return [];
          }
          return res.json();
        })
        .then((data) => setListingsData(data || []))
        .catch((err) => {
          console.error('Error fetching listings', err);
          setListingsData([]);
        })
        .finally(() => setLoadingListings(false));
    }

    if (selectedSection === 'listings') {
      loadListings();
    }
  }, [selectedSection]);

  const handleDeleteUser = () => {
    fetch(`http://localhost:8080/api/users/${encodeURIComponent(profileData.email)}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => {
        if (!response.ok) throw new Error('Delete failed');
        console.log('User deleted successfully');
        onNavigate('home');
      })
      .catch((err) => console.error('Error:', err));
  };

  const handleSaveProfile = () => {
    const payload = {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      phone: profileData.phone,
      password: ''
    };

    fetch(`http://localhost:8080/api/users/${encodeURIComponent(profileData.email)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then((response) => {
        if (!response.ok) throw new Error('Update failed');
        console.log('Profile updated successfully');
        setIsEditing(false);
        setSubmitError('');
      })
      .catch((err) => {
        console.error('Error:', err);
        setSubmitError('Failed to update profile. Please try again.');
      });
  };

  // New: delete a listing by id (with confirmation)
  function handleDeleteListing(listingId: number) {
    const ok = window.confirm('Are you sure you want to delete this listing? This action cannot be undone.');
    if (!ok) return;

    fetch(`${API_BASE}/api/listings/${listingId}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete listing');
        // refresh listings
        const userId = getLocalUserId();
        return fetch(`${API_BASE}/api/listings/user/${userId}`);
      })
      .then((r) => (r && r.ok) ? r.json() : [])
      .then((data) => setListingsData(data || []))
      .catch((err) => {
        console.error('Delete listing error', err);
        alert('Failed to delete listing. Try again.');
      });
  }

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
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box>
                      <Typography variant="h5" sx={{ mb: 1 }}>
                        My Listings
                      </Typography>
                      <Typography color="text.secondary">
                        {listingsData.length} active listings
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onNavigate('addListing')}
                      sx={{
                        borderRadius: '8px',
                        textTransform: 'none'
                      }}
                    >
                      Add listing
                    </Button>
                  </Box>
                </Paper>

                {listingsData.length === 0 && !loadingListings && (
                  <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '12px' }}>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      You don't have any active listings yet.
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onNavigate('addListing')}
                      sx={{
                        borderRadius: '8px',
                        textTransform: 'none'
                      }}
                    >
                      Create your first listing
                    </Button>
                  </Paper>
                )}

                {listingsData.length > 0 && (
                  <Grid container spacing={3}>
                    {listingsData.map((car: any) => (
                      <Grid item xs={12} key={car.listingId}>
                        <Card sx={{ borderRadius: '12px', boxShadow: '0 6px 18px rgba(0,0,0,0.08)', textAlign: 'center' }}>
                          <Box sx={{ overflow: 'hidden', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                            <CardMedia
                              component="img"
                              image={car.mainImageUrl || '/src/assets/react.svg'}
                              alt={car.carFullName}
                              sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                            />
                          </Box>

                          <CardContent>
                            <Typography variant="subtitle1" sx={{ mb: 0.5, color: 'text.primary', fontWeight: 600 }}>
                              {car.carFullName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                              {car.boughtDate || ''} · {car.kmDrove?.toLocaleString() || 0} km
                            </Typography>

                            <Typography variant="h5" sx={{ color: 'secondary.main', fontWeight: 700, mb: 1 }}>
                              {car.price?.toLocaleString ? car.price.toLocaleString() + ' €' : car.price + ' €'}
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                              <Button
                                variant="contained"
                                color="primary"

                                onClick={() => onNavigate('addListing', car.listingId)}
                                sx={{ borderRadius: '8px', textTransform: 'none' }}
                              >
                                View details
                              </Button>
                              <Button variant="outlined" color="error" sx={{ borderRadius: '8px', textTransform: 'none' }} onClick={() => handleDeleteListing(car.listingId)}>
                                Remove
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
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
