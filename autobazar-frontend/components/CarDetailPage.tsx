import { 
  Container, 
  Box, 
  Typography, 
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { useState } from 'react';
import { mockCars } from '../utils/mockData';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SpeedIcon from '@mui/icons-material/Speed';
import SettingsIcon from '@mui/icons-material/Settings';

interface CarDetailPageProps {
  carId: number;
}

export function CarDetailPage({ carId }: CarDetailPageProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  const car = mockCars.find(c => c.id === carId) || mockCars[0];

  // Mock additional images (using same image for demo)
  const images = [car.image, car.image, car.image, car.image];

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: '12px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h3" sx={{ mb: 1 }}>
                {car.brand} {car.model}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOnIcon color="action" fontSize="small" />
                <Typography color="text.secondary">
                  {car.location}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h3" sx={{ color: 'secondary.main', mb: 1 }}>
                ${car.price.toLocaleString()}
              </Typography>
              <Button 
                variant="contained" 
                color="secondary"
                size="large"
                sx={{ 
                  borderRadius: '8px',
                  textTransform: 'none',
                  px: 4
                }}
              >
                Reserve car
              </Button>
            </Box>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {/* Left Column - Images */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: '12px', mb: 3 }}>
              {/* Main Image */}
              <Box
                component="img"
                src={images[selectedImage]}
                alt={`${car.brand} ${car.model}`}
                sx={{
                  width: '100%',
                  height: '500px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  mb: 2
                }}
              />
              
              {/* Thumbnail Gallery */}
              <Grid container spacing={2}>
                {images.map((img, index) => (
                  <Grid item xs={3} key={index}>
                    <Box
                      component="img"
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => setSelectedImage(index)}
                      sx={{
                        width: '100%',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        border: selectedImage === index ? '3px solid' : '2px solid transparent',
                        borderColor: selectedImage === index ? 'secondary.main' : 'transparent',
                        transition: 'all 0.2s',
                        '&:hover': {
                          opacity: 0.8
                        }
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Tabs Section */}
            <Paper sx={{ borderRadius: '12px' }}>
              <Tabs 
                value={selectedTab} 
                onChange={(_, newValue) => setSelectedTab(newValue)}
                sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}
              >
                <Tab label="Overview" sx={{ textTransform: 'none' }} />
                <Tab label="Technical data" sx={{ textTransform: 'none' }} />
                <Tab label="History" sx={{ textTransform: 'none' }} />
                <Tab label="Delivery & Warranty" sx={{ textTransform: 'none' }} />
              </Tabs>

              <Box sx={{ p: 3 }}>
                {selectedTab === 0 && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Vehicle Overview
                    </Typography>
                    <Typography paragraph color="text.secondary">
                      {car.description}
                    </Typography>
                    <Typography paragraph color="text.secondary">
                      This {car.year} {car.brand} {car.model} is in excellent condition with {car.mileage.toLocaleString()} miles. 
                      It features a {car.engine} engine with {car.gearbox.toLowerCase()} transmission. 
                      The vehicle has been well-maintained with complete service records.
                    </Typography>
                  </Box>
                )}
                
                {selectedTab === 1 && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Technical Specifications
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <List>
                          <ListItem>
                            <ListItemText 
                              primary="Engine" 
                              secondary={car.engine}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Power" 
                              secondary="300 HP"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Torque" 
                              secondary="400 Nm"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Fuel Type" 
                              secondary={car.fuel}
                            />
                          </ListItem>
                        </List>
                      </Grid>
                      <Grid item xs={6}>
                        <List>
                          <ListItem>
                            <ListItemText 
                              primary="Transmission" 
                              secondary={car.gearbox}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Drive Type" 
                              secondary="AWD"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="0-60 mph" 
                              secondary="5.5 seconds"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText 
                              primary="Fuel Economy" 
                              secondary="28 MPG combined"
                            />
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  </Box>
                )}
                
                {selectedTab === 2 && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Vehicle History
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText 
                          primary="Ownership" 
                          secondary="Single owner from new"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Accident History" 
                          secondary="No accidents reported"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Service Records" 
                          secondary="Complete service history available"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Title Status" 
                          secondary="Clean title"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText 
                          primary="Last Service" 
                          secondary="October 2024 - Full inspection"
                        />
                      </ListItem>
                    </List>
                  </Box>
                )}
                
                {selectedTab === 3 && (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Delivery & Warranty
                    </Typography>
                    <Typography paragraph color="text.secondary">
                      <strong>Home Delivery:</strong> We offer free home delivery within 100 miles. 
                      For longer distances, delivery can be arranged at a competitive rate.
                    </Typography>
                    <Typography paragraph color="text.secondary">
                      <strong>Warranty:</strong> This vehicle comes with a comprehensive 12-month/12,000-mile warranty 
                      covering major components including engine, transmission, and electrical systems.
                    </Typography>
                    <Typography paragraph color="text.secondary">
                      <strong>Return Policy:</strong> 7-day money-back guarantee if you're not completely satisfied.
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Right Column - Specs and Contact */}
          <Grid item xs={12} md={4}>
            {/* Key Specifications Card */}
            <Card sx={{ mb: 3, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  Key Specifications
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f5f5f5', borderRadius: '8px' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Year
                      </Typography>
                      <Typography>
                        {car.year}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f5f5f5', borderRadius: '8px' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                        <SpeedIcon fontSize="small" color="action" />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Mileage
                      </Typography>
                      <Typography>
                        {car.mileage.toLocaleString()} mi
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f5f5f5', borderRadius: '8px' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                        <LocalGasStationIcon fontSize="small" color="action" />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Fuel
                      </Typography>
                      <Typography>
                        {car.fuel}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f5f5f5', borderRadius: '8px' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                        <SettingsIcon fontSize="small" color="action" />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Gearbox
                      </Typography>
                      <Typography>
                        {car.gearbox}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ p: 1 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Engine
                      </Typography>
                      <Typography>
                        {car.engine}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ p: 1 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Body Type
                      </Typography>
                      <Typography>
                        {car.bodyType}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Features Card */}
            <Card sx={{ mb: 3, borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Features
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {car.features.map((feature, index) => (
                    <Chip 
                      key={index} 
                      label={feature}
                      size="small"
                      sx={{ borderRadius: '8px' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Financing Card */}
            <Card 
              sx={{ 
                borderRadius: '12px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                position: 'sticky',
                top: 80
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Financing Options
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Get pre-approved for financing with rates as low as 3.9% APR.
                </Typography>
                <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: '8px', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Estimated monthly payment
                  </Typography>
                  <Typography variant="h5" sx={{ color: 'secondary.main' }}>
                    ${Math.round(car.price / 60).toLocaleString()}/mo
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Based on 60 months at 4.5% APR
                  </Typography>
                </Box>
                <Button 
                  fullWidth 
                  variant="outlined"
                  sx={{ 
                    mb: 2,
                    borderRadius: '8px',
                    textTransform: 'none'
                  }}
                >
                  Get pre-approved
                </Button>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Contact Seller
                </Typography>
                <Button 
                  fullWidth 
                  variant="contained"
                  color="primary"
                  sx={{ 
                    mb: 1,
                    borderRadius: '8px',
                    textTransform: 'none'
                  }}
                >
                  Call now
                </Button>
                <Button 
                  fullWidth 
                  variant="outlined"
                  sx={{ 
                    borderRadius: '8px',
                    textTransform: 'none'
                  }}
                >
                  Send message
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
