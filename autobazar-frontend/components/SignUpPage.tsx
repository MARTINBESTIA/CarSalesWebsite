import { 
  Box, 
  Card, 
  CardContent,
  Typography, 
  TextField, 
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  Grid
} from '@mui/material';
import { useState } from 'react';

interface SignUpPageProps {
  onNavigate: (page: string) => void;
}

export function SignUpPage({ onNavigate }: SignUpPageProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const handleSignUp = () => {
    // Mock sign up logic
    console.log('Sign up with:', formData);
    onNavigate('dashboard');
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8
      }}
    >
      <Card 
        sx={{ 
          maxWidth: 600,
          width: '100%',
          mx: 2,
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 1, textAlign: 'center' }}>
            Create an account
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 4, textAlign: 'center' }}
          >
            Join AutoHub to find your perfect car
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First name"
                value={formData.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last name"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Phone number"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => updateField('password', e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Confirm password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => updateField('confirmPassword', e.target.value)}
            sx={{ mb: 3 }}
          />

          <FormControlLabel
            control={
              <Checkbox 
                checked={formData.acceptTerms}
                onChange={(e) => updateField('acceptTerms', e.target.checked)}
                size="small"
              />
            }
            label={
              <Typography variant="body2">
                I accept the{' '}
                <Link href="#" underline="hover">
                  Terms and Conditions
                </Link>
                {' '}and{' '}
                <Link href="#" underline="hover">
                  Privacy Policy
                </Link>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleSignUp}
            disabled={!formData.acceptTerms}
            sx={{ 
              mb: 3,
              borderRadius: '8px',
              textTransform: 'none',
              py: 1.5
            }}
          >
            Create account
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Link 
                href="#" 
                underline="hover"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('signin');
                }}
                sx={{ color: 'secondary.main' }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
