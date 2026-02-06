import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';

interface AddListingPageProps {
  onNavigate: (page: string, payload?: any) => void;
}

export function AddListingPage({ onNavigate }: AddListingPageProps) {
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    fuel: '',
    gearbox: '',
    engine: '',
    bodyType: '',
    location: '',
    description: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Form submission logic will be added later
    console.log('Listing submitted:', formData);
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ position: 'relative', mb: 4 }}>
          <IconButton
            onClick={() => onNavigate('dashboard', { section: 'listings' })}
            sx={{
              position: 'absolute',
              top: -20,
              left: -12,
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'rgba(0,0,0,0.05)'
              }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Add New Listing
          </Typography>
          <Typography color="text.secondary">
            Fill in the details about your car to create a new listing
          </Typography>
        </Box>

        <Paper sx={{ p: 4, borderRadius: '12px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Brand"
                value={formData.brand}
                onChange={(e) => handleChange('brand', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Model"
                value={formData.model}
                onChange={(e) => handleChange('model', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Year"
                type="number"
                value={formData.year}
                onChange={(e) => handleChange('year', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mileage (miles)"
                type="number"
                value={formData.mileage}
                onChange={(e) => handleChange('mileage', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price ($)"
                type="number"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fuel Type"
                value={formData.fuel}
                onChange={(e) => handleChange('fuel', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Gearbox"
                value={formData.gearbox}
                onChange={(e) => handleChange('gearbox', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Engine"
                value={formData.engine}
                onChange={(e) => handleChange('engine', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Body Type"
                value={formData.bodyType}
                onChange={(e) => handleChange('bodyType', e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={5}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleSubmit}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  px: 4
                }}
              >
                Publish Listing
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => onNavigate('dashboard', { section: 'listings' })}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  px: 4
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
