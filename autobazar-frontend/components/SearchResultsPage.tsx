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
import { useState, useEffect } from 'react';
import { bodyTypes, fuelTypes as mockFuelTypes, gearboxTypes, brands } from '../utils/mockData';
import { API_BASE } from '../src/api';

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
  const [allCars, setAllCars] = useState<any[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([]);
  const carsPerPage = 6;
  const MGrid: any = (Grid as any);
  const [isLoading, setIsLoading] = useState(true);

  // Load all listings once
  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_BASE}/api/listings/all`)
      .then(r => r.ok ? r.json() : [])
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        setAllCars(arr);

        // initialize filters so that everything is included by default
        if (arr.length > 0) {
          // Price
          const prices = arr.map((c: any) => (typeof c.price === 'number' ? c.price : (c.price ? Number(c.price) : NaN))).filter((p: number) => !isNaN(p));
          const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
          const maxPrice = prices.length > 0 ? Math.max(...prices) : 100000;
          setPriceRange([Math.max(0, minPrice), Math.max(minPrice, maxPrice)]);

          // Mileage (kmDrove)
          const miles = arr.map((c: any) => (c.kmDrove != null ? Number(c.kmDrove) : NaN)).filter((m: number) => !isNaN(m));
          const minMiles = miles.length > 0 ? Math.min(...miles) : 0;
          const maxMiles = miles.length > 0 ? Math.max(...miles) : 100000;
          setMileageRange([Math.max(0, minMiles), Math.max(minMiles, maxMiles)]);

          // Year range: derive from boughtDate or carFullName
          const years: number[] = [];
          arr.forEach((c: any) => {
            if (c.boughtDate) {
              const y = new Date(c.boughtDate).getFullYear();
              if (!isNaN(y)) years.push(y);
            }
            if (c.carFullName) {
              const m = ('' + c.carFullName).match(/(19|20)\d{2}/);
              if (m) years.push(Number(m[0]));
            }
          });
          const minYear = years.length > 0 ? Math.min(...years) : 2015;
          const maxYear = years.length > 0 ? Math.max(...years) : new Date().getFullYear();
          setYearRange([minYear, maxYear]);
        }
      })
      .catch(err => { console.error('Failed to load listings', err); setAllCars([]); })
      .finally(() => setIsLoading(false));
  }, []);

  // Apply filters to allCars
  const filtered = allCars.filter((c: any) => {
    // price - allow listings without price to be shown; only filter when numeric
    const priceVal = (c.price != null && !isNaN(Number(c.price))) ? Number(c.price) : null;
    if (priceVal != null) {
      if (priceVal < priceRange[0] || priceVal > priceRange[1]) return false;
    }
    // mileage / km (backend uses kmDrove)
    const kmVal = (c.kmDrove != null && !isNaN(Number(c.kmDrove))) ? Number(c.kmDrove) : (c.mileage != null && !isNaN(Number(c.mileage)) ? Number(c.mileage) : null);
    if (kmVal != null) {
      if (kmVal < mileageRange[0] || kmVal > mileageRange[1]) return false;
    }
    // year parsing: try to extract year from carFullName or boughtDate
    if (yearRange && yearRange.length === 2) {
      let year = null;
      if (c.boughtDate) {
        try { year = new Date(c.boughtDate).getFullYear(); } catch(e){}
      }
      if (!year && c.carFullName) {
        const m = c.carFullName.match(/(19|20)\d{2}/);
        if (m) year = parseInt(m[0]);
      }
      if (year) {
        if (year < yearRange[0] || year > yearRange[1]) return false;
      }
    }
    // fuel type
    if (selectedFuelTypes.length > 0) {
      if (!c.carFuelTypeId && !c.fuel) return false;
      // we compare by name if frontend options are names
      if (c.carFuelTypeId == null && typeof c.fuel === 'string') {
        if (!selectedFuelTypes.includes(c.fuel)) return false;
      }
    }
    // features: ensure all selected feature ids are present
    if (selectedFeatures.length > 0) {
      const fIds: number[] = c.featureIds || [];
      for (const fid of selectedFeatures) {
        if (!fIds.includes(fid)) return false;
      }
    }
    return true;
  });

  const totalFilteredPages = Math.max(1, Math.ceil(filtered.length / carsPerPage));
  const displayedFilteredCars = filtered.slice((page - 1) * carsPerPage, page * carsPerPage);

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

  if (isLoading) {
    return (
      <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 8 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" align="center" sx={{ mb: 3 }}>Loading listings...</Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 3 }}>
          Search Results
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {filtered.length === 0 ? 'No cars available' : `${filtered.length} cars available`}
        </Typography>

        <MGrid container spacing={3}>
          {/* Filters Sidebar */}
          <MGrid item xs={12} md={3}>
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
                {mockFuelTypes.map((fuel) => (
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
          </MGrid>

          {/* Results Grid */}
          <MGrid item xs={12} md={9}>
            <Paper sx={{ p: 2, mb: 3, borderRadius: '12px' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>
                  {filtered.length === 0 ? 'No results' : `Showing ${(page - 1) * carsPerPage + 1}-${Math.min(page * carsPerPage, filtered.length)} of ${filtered.length} results`}
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

            {filtered.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center', borderRadius: '12px' }}>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  No cars match your search criteria. Try adjusting your filters.
                </Typography>
              </Paper>
            ) : (
              <MGrid container spacing={3}>
                {displayedFilteredCars.map((car) => (
                  <MGrid item xs={12} sm={6} lg={4} key={car.listingId}>
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
                          image={car.mainImageUrl || '/src/assets/react.svg'}
                          alt={car.carFullName || 'Car image'}
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
                          {car.carFullName || (car.brand + ' ' + (car.model || ''))}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                          <Typography variant="body2" color="text.secondary">
                            {(() => {
                              // prefer explicit year, else derive from boughtDate or carFullName
                              if (car.year) return car.year;
                              if (car.boughtDate) try { return new Date(car.boughtDate).getFullYear(); } catch(e) {}
                              if (car.carFullName) { const m = (''+car.carFullName).match(/(19|20)\d{2}/); if (m) return m[0]; }
                              return '';
                            })()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">•</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {(() => {
                              const km = (car.kmDrove != null && !isNaN(Number(car.kmDrove))) ? Number(car.kmDrove) : (car.mileage != null && !isNaN(Number(car.mileage)) ? Number(car.mileage) : null);
                              return km != null ? km.toLocaleString() : 'N/A';
                            })()} mi
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
                          {`${car.price != null ? Number(car.price).toLocaleString() : 'N/A'} €`}
                        </Typography>
                      </CardContent>
                      <Box sx={{ p: 2, pt: 0 }}>
                        <Button 
                          fullWidth 
                          variant="contained"
                          color="primary"
                          onClick={() => onNavigate('detail', car.listingId)}
                          sx={{
                            borderRadius: '8px',
                            textTransform: 'none'
                          }}
                        >
                          View car
                        </Button>
                      </Box>
                    </Card>
                  </MGrid>
                ))}
              </MGrid>
            )}

            {filtered.length > 0 && (
               <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                 <Pagination
                   count={totalFilteredPages}
                   page={page}
                   onChange={(_, value) => setPage(value)}
                   color="primary"
                   size="large"
                 />
               </Box>
             )}
          </MGrid>
        </MGrid>
      </Container>
    </Box>
  );
}
