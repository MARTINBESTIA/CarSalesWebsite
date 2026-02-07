import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  CardMedia,
  CardActions,
  Paper,
  FormControl,
  InputLabel
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShieldIcon from '@mui/icons-material/Shield';
import SearchIcon from '@mui/icons-material/Search';
import { mockCars, brands } from '../utils/mockData';
import { useState } from 'react';

interface HomePageProps {
  onNavigate: (page: string, carId?: number) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [searchFilters, setSearchFilters] = useState({
    brand: '',
    model: '',
    priceFrom: '',
    priceTo: '',
    yearFrom: '',
    yearTo: ''
  });

  const popularCars: typeof mockCars = [];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '600px',
          backgroundImage: 'url(https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200&h=600&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              color: 'white', 
              mb: 2,
              textAlign: 'center'
            }}
          >
            Find Your Perfect Car
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'white', 
              mb: 4,
              textAlign: 'center',
              opacity: 0.9
            }}
          >
            Browse thousands of verified used cars
          </Typography>

          {/* Search Panel */}
          <Paper
            elevation={8}
            sx={{
              p: 4,
              borderRadius: '12px',
              maxWidth: '900px',
              mx: 'auto'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Brand</InputLabel>
                  <Select
                    value={searchFilters.brand}
                    label="Brand"
                    onChange={(e) => setSearchFilters({ ...searchFilters, brand: e.target.value })}
                  >
                    {brands.map((brand) => (
                      <MenuItem key={brand} value={brand}>{brand}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Model"
                  value={searchFilters.model}
                  onChange={(e) => setSearchFilters({ ...searchFilters, model: e.target.value })}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="Price from"
                  type="number"
                  value={searchFilters.priceFrom}
                  onChange={(e) => setSearchFilters({ ...searchFilters, priceFrom: e.target.value })}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="Price to"
                  type="number"
                  value={searchFilters.priceTo}
                  onChange={(e) => setSearchFilters({ ...searchFilters, priceTo: e.target.value })}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="Year from"
                  type="number"
                  value={searchFilters.yearFrom}
                  onChange={(e) => setSearchFilters({ ...searchFilters, yearFrom: e.target.value })}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  fullWidth
                  label="Year to"
                  type="number"
                  value={searchFilters.yearTo}
                  onChange={(e) => setSearchFilters({ ...searchFilters, yearTo: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<SearchIcon />}
                  onClick={() => onNavigate('search')}
                  sx={{
                    py: 1.5,
                    borderRadius: '8px',
                    textTransform: 'none'
                  }}
                >
                  Search cars
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <VerifiedIcon 
                    sx={{ 
                      fontSize: 64, 
                      color: 'secondary.main',
                      mb: 2
                    }} 
                  />
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Inspected Cars
                  </Typography>
                  <Typography color="text.secondary">
                    Every car undergoes a rigorous 200-point inspection to ensure quality and reliability
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <LocalShippingIcon 
                    sx={{ 
                      fontSize: 64, 
                      color: 'secondary.main',
                      mb: 2
                    }} 
                  />
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Home Delivery
                  </Typography>
                  <Typography color="text.secondary">
                    Get your dream car delivered straight to your doorstep. Safe, fast, and convenient
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <ShieldIcon 
                    sx={{ 
                      fontSize: 64, 
                      color: 'secondary.main',
                      mb: 2
                    }} 
                  />
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Warranty
                  </Typography>
                  <Typography color="text.secondary">
                    All vehicles come with comprehensive warranty coverage for your peace of mind
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Popular Cars Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
          Popular Cars
        </Typography>

        {popularCars.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '12px', mb: 4 }}>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              No popular cars available at the moment.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {popularCars.map((car) => (
              <Grid item xs={12} sm={6} md={3} key={car.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={car.image}
                    alt={`${car.brand} ${car.model}`}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {car.brand} {car.model}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                      <Typography variant="body2" color="text.secondary">
                        {car.year}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">•</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {car.mileage.toLocaleString()} mi
                      </Typography>
                      <Typography variant="body2" color="text.secondary">•</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {car.fuel}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: 'secondary.main',
                        mb: 2
                      }}
                    >
                      ${car.price.toLocaleString()}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button 
                      fullWidth 
                      variant="outlined"
                      onClick={() => onNavigate('detail', car.id)}
                      sx={{
                        borderRadius: '8px',
                        textTransform: 'none'
                      }}
                    >
                      View details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => onNavigate('search')}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              px: 4
            }}
          >
            View all cars
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
