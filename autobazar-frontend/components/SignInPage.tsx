import { 
  Box, 
  Card, 
  CardContent,
  Typography, 
  TextField, 
  Button,
  Checkbox,
  FormControlLabel,
  Link
} from '@mui/material';
import { useState } from 'react';

interface SignInPageProps {
  onNavigate: (page: string) => void;
}

export function SignInPage({ onNavigate }: SignInPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = () => {
    // Mock sign in logic
    console.log('Sign in with:', email, password);
    onNavigate('dashboard');
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
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 4, textAlign: 'center' }}
          >
            Welcome back! Please enter your details.
          </Typography>

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  size="small"
                />
              }
              label="Remember me"
            />
            <Link 
              href="#" 
              underline="hover"
              sx={{ fontSize: '0.875rem' }}
            >
              Forgot password?
            </Link>
          </Box>

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleSignIn}
            sx={{ 
              mb: 3,
              borderRadius: '8px',
              textTransform: 'none',
              py: 1.5
            }}
          >
            Sign in
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Link 
                href="#" 
                underline="hover"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('signup');
                }}
                sx={{ color: 'secondary.main' }}
              >
                Create an account
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
