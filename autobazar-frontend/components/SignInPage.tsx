import { 
  Box, 
  Card, 
  CardContent,
  Typography, 
  TextField, 
  Button,
  Link,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';

interface SignInPageProps {
  onNavigate: (page: string, userData?: any) => void;
}

export function SignInPage({ onNavigate }: SignInPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSignIn = async () => {
    setError('');
    try {
      // Login request
      const loginRes = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (!loginRes.ok) {
        setError('Invalid email or password.');
        return;
      }

      const loginResult = await loginRes.json();
      if (!loginResult) {
        setError('Invalid email or password.');
        return;
      }

      // Fetch user profile
      const profileRes = await fetch(`http://localhost:8080/api/users/${encodeURIComponent(formData.email)}`);
      if (!profileRes.ok) {
        setError('Failed to fetch user profile.');
        return;
      }
      const userData = await profileRes.json();

      onNavigate('dashboard', userData);
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        position: 'relative'
      }}
    >
      <IconButton
        onClick={() => onNavigate('home')}
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          color: 'primary.main',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.05)'
          }
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Card 
        sx={{ 
          maxWidth: 480,
          width: '100%',
          mx: 2,
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 1, textAlign: 'center' }}>
            Sign in
          </Typography>

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={e => handleChange('email', e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={formData.password}
            onChange={e => handleChange('password', e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleSignIn}
            sx={{ 
              mb: 2,
              borderRadius: '8px',
              textTransform: 'none',
              py: 1.5
            }}
          >
            Sign in
          </Button>

          {error && (
            <Typography variant="body2" sx={{ color: '#d32f2f', textAlign: 'center', mb: 2 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link 
                href="#" 
                underline="hover"
                onClick={e => {
                  e.preventDefault();
                  onNavigate('signup');
                }}
                sx={{ color: 'secondary.main' }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
