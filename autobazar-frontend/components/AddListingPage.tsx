import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  IconButton,
  Autocomplete,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import dayjs, { Dayjs } from 'dayjs';
import { useState, useEffect } from 'react';

interface AddListingPageProps {
  onNavigate: (page: string, payload?: any) => void;
}

export function AddListingPage({ onNavigate }: AddListingPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    brand: null as string | null,
    fuelType: null as string | null,
    boughtDate: null as Dayjs | null,
    horsePower: '',
    kilometers: '',
    price: '',
    features: [] as string[]
  });

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);

  const [brands, setBrands] = useState<string[]>([]);
  const [fuelTypes, setFuelTypes] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);

  const [brandSearch, setBrandSearch] = useState('');
  const [fuelSearch, setFuelSearch] = useState('');
  const [featureSearch, setFeatureSearch] = useState('');

  const [loadingBrands, setLoadingBrands] = useState(false);
  const [loadingFuel, setLoadingFuel] = useState(false);
  const [loadingFeatures, setLoadingFeatures] = useState(false);

  const [submitError, setSubmitError] = useState('');

  // Fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      setLoadingBrands(true);
      try {
        const url = brandSearch
          ? `http://localhost:8080/api/brands?q=${encodeURIComponent(brandSearch)}`
          : 'http://localhost:8080/api/brands';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setBrands(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Error fetching brands:', err);
      } finally {
        setLoadingBrands(false);
      }
    };

    const timer = setTimeout(fetchBrands, 300);
    return () => clearTimeout(timer);
  }, [brandSearch]);

  // Fetch fuel types
  useEffect(() => {
    const fetchFuelTypes = async () => {
      setLoadingFuel(true);
      try {
        const url = fuelSearch
          ? `http://localhost:8080/api/fuel-types/search?q=${encodeURIComponent(fuelSearch)}`
          : 'http://localhost:8080/api/fuel-types';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setFuelTypes(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Error fetching fuel types:', err);
      } finally {
        setLoadingFuel(false);
      }
    };

    const timer = setTimeout(fetchFuelTypes, 300);
    return () => clearTimeout(timer);
  }, [fuelSearch]);

  // Fetch features
  useEffect(() => {
    const fetchFeatures = async () => {
      setLoadingFeatures(true);
      try {
        const url = featureSearch
          ? `http://localhost:8080/api/features?q=${encodeURIComponent(featureSearch)}`
          : 'http://localhost:8080/api/features';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setFeatures(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Error fetching features:', err);
      } finally {
        setLoadingFeatures(false);
      }
    };

    const timer = setTimeout(fetchFeatures, 300);
    return () => clearTimeout(timer);
  }, [featureSearch]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleAdditionalImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAdditionalImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = () => {
    // Form submission logic will be added later
    console.log('Listing submitted:', {
      formData,
      mainImage,
      additionalImages
    });
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
            {/* Full Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full name"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder="e.g., 2022 BMW 320i"
              />
            </Grid>

            {/* Brand */}
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                options={brands}
                value={formData.brand}
                onChange={(_, newValue) => handleChange('brand', newValue)}
                inputValue={brandSearch}
                onInputChange={(_, newInputValue) => setBrandSearch(newInputValue)}
                loading={loadingBrands}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Brand"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingBrands && <CircularProgress color="inherit" size={20} />}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            {/* Fuel Type */}
            <Grid item xs={12} sm={6}>
              <Autocomplete
                fullWidth
                options={fuelTypes}
                value={formData.fuelType}
                onChange={(_, newValue) => handleChange('fuelType', newValue)}
                inputValue={fuelSearch}
                onInputChange={(_, newInputValue) => setFuelSearch(newInputValue)}
                loading={loadingFuel}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Fuel Type"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingFuel && <CircularProgress color="inherit" size={20} />}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            {/* Bought Date */}
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Bought Date"
                  value={formData.boughtDate}
                  onChange={(newValue) => handleChange('boughtDate', newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>

            {/* Horse Power */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Horse Power (HP)"
                type="number"
                value={formData.horsePower}
                onChange={(e) => handleChange('horsePower', e.target.value)}
              />
            </Grid>

            {/* Kilometers */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Kilometers Drove"
                type="number"
                value={formData.kilometers}
                onChange={(e) => handleChange('kilometers', e.target.value)}
              />
            </Grid>

            {/* Price */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price ($)"
                type="number"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
              />
            </Grid>

            {/* Features */}
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                multiple
                options={features}
                value={formData.features}
                onChange={(_, newValue) => handleChange('features', newValue)}
                inputValue={featureSearch}
                onInputChange={(_, newInputValue) => setFeatureSearch(newInputValue)}
                loading={loadingFeatures}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                      key={index}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Features"
                    placeholder="Search and select features"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingFeatures && <CircularProgress color="inherit" size={20} />}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            {/* Main Image Upload */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Main Picture
              </Typography>
              <Paper
                sx={{
                  p: 3,
                  border: '2px dashed',
                  borderColor: 'primary.main',
                  borderRadius: '8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'rgba(26, 35, 50, 0.05)'
                  }
                }}
                component="label"
              >
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageUpload}
                />
                <CloudUploadIcon
                  sx={{
                    fontSize: 48,
                    color: 'primary.main',
                    mb: 1
                  }}
                />
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {mainImage ? mainImage.name : 'Click to upload main picture'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  or drag and drop
                </Typography>
              </Paper>
            </Grid>

            {/* Additional Images Upload */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Additional Pictures
              </Typography>
              <Paper
                sx={{
                  p: 3,
                  border: '2px dashed',
                  borderColor: 'secondary.main',
                  borderRadius: '8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'rgba(255, 111, 0, 0.05)'
                  }
                }}
                component="label"
              >
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesUpload}
                />
                <CloudUploadIcon
                  sx={{
                    fontSize: 48,
                    color: 'secondary.main',
                    mb: 1
                  }}
                />
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {additionalImages.length > 0
                    ? `${additionalImages.length} picture(s) selected`
                    : 'Click to upload additional pictures'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  or drag and drop
                </Typography>
              </Paper>
              {additionalImages.length > 0 && (
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {additionalImages.map((file, index) => (
                    <Chip
                      key={index}
                      label={file.name}
                      onDelete={() =>
                        setAdditionalImages(additionalImages.filter((_, i) => i !== index))
                      }
                    />
                  ))}
                </Box>
              )}
            </Grid>

            {submitError && (
              <Grid item xs={12}>
                <Alert severity="error">{submitError}</Alert>
              </Grid>
            )}

            {/* Buttons */}
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
