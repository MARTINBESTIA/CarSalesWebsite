import { 
  Container, 
  Box, 
  Typography, 
  Grid,
  Card,
  CardContent,
  Paper,
  Divider
} from '@mui/material';
import { useState, useEffect } from 'react';
import { mockCars } from '../utils/mockData';
import { API_BASE } from '../src/api';

interface CarDetailPageProps {
  carId: number;
  onNavigate?: (page: string, payload?: any) => void;
}

export function CarDetailPage({ carId, onNavigate }: CarDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [listing, setListing] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);

  useEffect(() => {
    function loadImagesAndListing() {
      fetch(`${API_BASE}/api/listings/${carId}/images`)
        .then((r) => {
          if (!r.ok) return [];
          return r.json();
        })
        .then((imgs) => {
          setImages(imgs && imgs.length > 0 ? imgs : []);
        })
        .catch((err) => {
          console.error('Failed to load images', err);
          setImages([]);
        });

      fetch(`${API_BASE}/api/listings/${carId}`)
        .then((r) => {
          if (!r.ok) return null;
          return r.json();
        })
        .then((data) => setListing(data))
        .catch((err) => {
          console.error('Failed to load listing', err);
          setListing(null);
        });
    }

    loadImagesAndListing();
  }, [carId]);

  useEffect(() => {
    if (listing && listing.userId) {
      fetch(`${API_BASE}/api/users/id/${listing.userId}`)
        .then((r) => r.ok ? r.json() : null)
        .then((u) => setSeller(u))
        .catch(() => setSeller(null));
    }
  }, [listing]);

  const car = listing || mockCars.filter(function(c){ return c.id === carId; })[0] || mockCars[0];

  const gallery = images.length > 0 ? images : [car.image, car.image, car.image, car.image];

  // Safe derived values to avoid runtime errors when fields are missing
  const priceDisplay = (car && car.price != null && !isNaN(Number(car.price))) ? `${Number(car.price).toLocaleString()} €` : 'N/A';
  const kmVal = (car && car.kmDrove != null && !isNaN(Number(car.kmDrove))) ? Number(car.kmDrove)
    : (car && car.mileage != null && !isNaN(Number(car.mileage)) ? Number(car.mileage) : null);
  const kmDisplay = kmVal != null ? `${kmVal.toLocaleString()} mi` : 'N/A';
  const yearDisplay = (car && car.year) ? car.year : (car && car.boughtDate ? new Date(car.boughtDate).getFullYear() : (car && car.carFullName ? ((''+car.carFullName).match(/(19|20)\d{2}/) || [null])[0] : ''));
  const gearboxLower = (car && car.gearbox) ? (''+car.gearbox).toLowerCase() : '';
  const monthlyDisplay = (car && car.price != null && !isNaN(Number(car.price))) ? `${Math.round(Number(car.price) / 60).toLocaleString()}/mo` : 'N/A';

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        {/* Centered Header */}
        <Paper sx={{ p: 4, mb: 4, borderRadius: '12px', textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 1 }}>
            {car.brand ? `${car.brand} ${car.model || ''}` : car.brand || car.carFullName}
          </Typography>
          <Typography variant="h5" sx={{ color: 'secondary.main' }}>
            {priceDisplay}
          </Typography>
        </Paper>

        <Grid container spacing={4} justifyContent="center">
          {/* Left: Gallery */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3, borderRadius: '12px', mb: 3 }}>
              <Box
                component="img"
                src={gallery[selectedImage]}
                alt={`${car.brand} ${car.model}`}
                sx={{ width: '100%', height: 520, objectFit: 'cover', borderRadius: '8px', mb: 2 }}
              />
              <Grid container spacing={2}>
                {gallery.map((img, index) => (
                  <Grid item xs={3} key={index}>
                    <Box
                      component="img"
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => setSelectedImage(index)}
                      sx={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: '8px', cursor: 'pointer', border: selectedImage === index ? '3px solid' : '2px solid transparent', borderColor: selectedImage === index ? 'secondary.main' : 'transparent' }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Right: Specs + Contact, centered */}
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3, borderRadius: '12px', textAlign: 'center', p: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Key Specifications</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                  <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: '8px', width: '100%' }}>
                    <Typography variant="body2" color="text.secondary">Year</Typography>
                    <Typography sx={{ mt: 1 }}>{yearDisplay || 'N/A'}</Typography>
                  </Box>
                  <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: '8px', width: '100%' }}>
                    <Typography variant="body2" color="text.secondary">Mileage</Typography>
                    <Typography sx={{ mt: 1 }}>{kmDisplay}</Typography>
                  </Box>
                  <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: '8px', width: '100%' }}>
                    <Typography variant="body2" color="text.secondary">Fuel</Typography>
                    <Typography sx={{ mt: 1 }}>{car.fuel || 'N/A'}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: '12px', textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Contact Seller</Typography>
                {seller ? (
                  <Box>
                    <Typography variant="subtitle1">{seller.firstName} {seller.lastName}</Typography>
                    <Typography variant="body2" color="text.secondary">{seller.phone}</Typography>
                    <Typography variant="body2" color="text.secondary">{seller.email}</Typography>
                  </Box>
                ) : (
                  <Typography color="text.secondary">Seller contact not available.</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
