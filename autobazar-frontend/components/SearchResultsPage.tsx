import { 
  Container, 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  CardMedia,
  Button,
  Paper,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  Chip,
  Pagination,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useState } from 'react';
import { bodyTypes, fuelTypes, gearboxTypes, brands } from '../utils/mockData';

interface SearchResultsPageProps {
  onNavigate: (page: string, carId?: number) => void;
}

export function SearchResultsPage({ onNavigate }: SearchResultsPageProps) {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<string[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedGearbox, setSelectedGearbox] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [mileageRange, setMileageRange] = useState<number[]>([0, 100000]);
  const [yearRange, setYearRange] = useState<number[]>([2015, 2025]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('recommended');

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleBodyTypeChange = (type: string) => {
    setSelectedBodyTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleResetFilters = () => {
    setSelectedBrands([]);
    setSelectedBodyTypes([]);
    setSelectedFuelTypes([]);
    setSelectedGearbox([]);
    setPriceRange([0, 100000]);
    setMileageRange([0, 100000]);
    setYearRange([2015, 2025]);
  };

  const mockCars: any[] = [];
  const carsPerPage = 6;
  const totalPages = Math.ceil(mockCars.length / carsPerPage);
  const displayedCars = mockCars.length > 0 ? mockCars.slice((page - 1) * carsPerPage, page * carsPerPage) : [];

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 3 }}>
          Search Results
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {mockCars.length === 0 ? 'No cars available' : `${mockCars.length} cars available`}
        </Typography>

        <Grid container spacing={3}>
          {/* Filters Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper 
              sx={{ 
                p: 3, 
                borderRadius: '12px',
                position: 'sticky',
                top: 80
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  Filters
                </Typography>
                <Button 
                  size="small"
                  onClick={handleResetFilters}
                  sx={{ textTransform: 'none' }}
                >
                  Reset
                </Button>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Brand Filter */}
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Brand
              </Typography>
              <FormGroup sx={{ mb: 3 }}>
                {brands.slice(1, 6).map((brand) => (
                  <FormControlLabel
                    key={brand}
                    control={
                      <Checkbox 
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        size="small"
                      />
                    }
                    label={brand}
                  />
                ))}
              </FormGroup>

              <Divider sx={{ mb: 3 }} />

              {/* Body Type Filter */}
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Body Type
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {bodyTypes.map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    onClick={() => handleBodyTypeChange(type)}
                    color={selectedBodyTypes.includes(type) ? 'secondary' : 'default'}
                    variant={selectedBodyTypes.includes(type) ? 'filled' : 'outlined'}
                  />
                ))}
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Fuel Type Filter */}
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Fuel Type
              </Typography>
              <FormGroup sx={{ mb: 3 }}>
                {fuelTypes.map((fuel) => (
                  <FormControlLabel
                    key={fuel}
                    control={
                      <Checkbox 
                        checked={selectedFuelTypes.includes(fuel)}
                        onChange={() => setSelectedFuelTypes(prev => 
                          prev.includes(fuel) ? prev.filter(f => f !== fuel) : [...prev, fuel]
                        )}
                        size="small"
                      />
                    }
                    label={fuel}
                  />
                ))}
              </FormGroup>

              <Divider sx={{ mb: 3 }} />

              {/* Gearbox Filter */}
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Gearbox
              </Typography>
              <FormGroup sx={{ mb: 3 }}>
                {gearboxTypes.map((gearbox) => (
                  <FormControlLabel
                    key={gearbox}
                    control={
                      <Checkbox 
                        checked={selectedGearbox.includes(gearbox)}
                        onChange={() => setSelectedGearbox(prev => 
                          prev.includes(gearbox) ? prev.filter(g => g !== gearbox) : [...prev, gearbox]
                        )}
                        size="small"
                      />
                    }
                    label={gearbox}
                  />
                ))}
              </FormGroup>

              <Divider sx={{ mb: 3 }} />

              {/* Price Range Slider */}
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Price Range
              </Typography>
              <Slider
                value={priceRange}
                onChange={(_, newValue) => setPriceRange(newValue as number[])}
                valueLabelDisplay="auto"
                min={0}
                max={100000}
                step={5000}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  ${priceRange[0].toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${priceRange[1].toLocaleString()}
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Mileage Range Slider */}
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Mileage Range (miles)
              </Typography>
              <Slider
                value={mileageRange}
                onChange={(_, newValue) => setMileageRange(newValue as number[])}
                valueLabelDisplay="auto"
                min={0}
                max={100000}
                step={5000}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  {mileageRange[0].toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {mileageRange[1].toLocaleString()}
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Year Range Slider */}
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Year Range
              </Typography>
              <Slider
                value={yearRange}
                onChange={(_, newValue) => setYearRange(newValue as number[])}
                valueLabelDisplay="auto"
                min={2015}
                max={2025}
                step={1}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  {yearRange[0]}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {yearRange[1]}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Results Grid */}
          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 2, mb: 3, borderRadius: '12px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>
                  {mockCars.length === 0 ? 'No results' : `Showing ${(page - 1) * carsPerPage + 1}-${Math.min(page * carsPerPage, mockCars.length)} of ${mockCars.length} results`}
                </Typography>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <InputLabel>Sort by</InputLabel>
                  <Select
                    value={sortBy}
                    label="Sort by"
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <MenuItem value="recommended">Recommended</MenuItem>
                    <MenuItem value="price-low">Price: Low to High</MenuItem>
                    <MenuItem value="price-high">Price: High to Low</MenuItem>
                    <MenuItem value="year-new">Year: Newest First</MenuItem>
                    <MenuItem value="mileage-low">Mileage: Low to High</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Paper>

            {mockCars.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '12px' }}>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  No cars match your search criteria. Try adjusting your filters.
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {displayedCars.map((car) => (
                  <Grid item xs={12} sm={6} lg={4} key={car.id}>
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
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="220"
                          image={car.image}
                          alt={`${car.brand} ${car.model}`}
                        />
                        {car.verified && (
                          <Chip
                            label="Verified"
                            color="success"
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              bgcolor: 'rgba(255, 255, 255, 0.95)'
                            }}
                          />
                        )}
                      </Box>
                      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
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
                          <Typography variant="body2" color="text.secondary">•</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {car.gearbox}
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
                      <Box sx={{ p: 2, pt: 0 }}>
                        <Button 
                          fullWidth 
                          variant="contained"
                          color="primary"
                          onClick={() => onNavigate('detail', car.id)}
                          sx={{
                            borderRadius: '8px',
                            textTransform: 'none'
                          }}
                        >
                          View car
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            {mockCars.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination 
                  count={totalPages} 
                  page={page} 
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
