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

type SignUpField = 'firstName' | 'lastName' | 'email' | 'phone' | 'password' | 'confirmPassword';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

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

  const [errors, setErrors] = useState<Record<SignUpField, string>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [submitError, setSubmitError] = useState('');

  // New: compute single-field error string (pure)
  const computeFieldError = (
    field: SignUpField,
    value: string | boolean,
    allValues: SignUpFormData
  ): string => {
    const str = String(value || '');
    switch (field) {
      case 'firstName':
      case 'lastName':
        if (!str.trim()) return ''; // keep empty -> show info hint instead of error (onBlur will fill if still empty)
        if (str.length < 2) return 'Must be at least 2 characters';
        if (str.length >= 30) return 'Must be shorter than 30 characters';
        return '';

      case 'email':
        if (!str.trim()) return '';
        if (!str.includes('@')) return 'Email must contain @';
        return '';

      case 'phone':
        if (!str.trim()) return '';
        if (!str.startsWith('+')) return 'Phone number must start with +';
        if (!/^\+\d{8,20}$/.test(str)) return 'Only digits after + (8-20 digits)';
        return '';

      case 'password':
        if (!str) return '';
        if (str.length < 8) return 'At least 8 characters';
        if (str.length > 30) return 'Must be at most 30 characters';
        return '';

      case 'confirmPassword':
        if (!str) return '';
        if (str !== allValues.password) return 'Passwords do not match';
        return '';
    }

    // ensure a string is always returned for TypeScript / safety
    return '';
  };

  const validateField = (
    field: SignUpField,
    value: string | boolean,
    allValues: SignUpFormData,
  ) => {
    const message = computeFieldError(field, value, allValues);

    // Only mark as "Required" when the value is empty/whitespace.
    if (!String(value).trim()) {
      setErrors(prev => ({ ...prev, [field]: 'Required' }));
      return;
    }

    // For non-empty values, set the computed message ('' clears the error)
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSubmitError('');
    // Don't validate on each keystroke — keep validation on blur and on submit
  };

  const handleBlur = (field: string) => {
    validateField(field as SignUpField, formData[field as keyof typeof formData], formData as SignUpFormData);
  };

  const validateAllAndSet = (): Record<SignUpField, string> => {
    const all = formData as SignUpFormData;
    const newErrors: Record<SignUpField, string> = {
      firstName: computeFieldError('firstName', all.firstName, all),
      lastName: computeFieldError('lastName', all.lastName, all),
      email: computeFieldError('email', all.email, all),
      phone: computeFieldError('phone', all.phone, all),
      password: computeFieldError('password', all.password, all),
      confirmPassword: computeFieldError('confirmPassword', all.confirmPassword, all),
    };

    // Mark empty required fields explicitly as 'Required'
    (Object.keys(newErrors) as SignUpField[]).forEach(k => {
      const val = String((all as any)[k] || '').trim();
      if (!val) newErrors[k] = 'Required';
    });

    setErrors(newErrors);
    return newErrors;
  };

  const handleSignUp = async () => {
    // Validate all fields before sign up
    const newErrors = validateAllAndSet();
    const hasErrors = Object.values(newErrors).some(e => e !== '');
    if (hasErrors) {
      setSubmitError('Fill all fields correctly before submitting.');
      return;
    }

    setSubmitError('');

    try {
      // Check if email already exists
      const emailCheckResponse = await fetch(
        `http://localhost:8080/api/users/email-exists?email=${encodeURIComponent(formData.email)}`
      );
      const emailExists = await emailCheckResponse.json();
      if (emailExists) {
        setSubmitError('Email already in use.');
        return;
      }

      // Check if phone already exists
      const phoneCheckResponse = await fetch(
        `http://localhost:8080/api/users/phone-exists?phone=${encodeURIComponent(formData.phone)}`
      );
      const phoneExists = await phoneCheckResponse.json();
      if (phoneExists) {
        setSubmitError('Phone number already in use.');
        return;
      }

      // Prepare payload
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      };

      // Send POST request
      const response = await fetch('http://localhost:8080/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      console.log('Sign up successful');
      onNavigate('dashboard');
    } catch (error) {
      console.error('Error:', error);
      setSubmitError('An error occurred. Please try again.');
    }
  };

  // Helper that returns either error text or empty (no grey hints)
  const helperFor = (field: SignUpField) => {
    return errors[field] || '';
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
                onBlur={() => handleBlur('firstName')}
                error={!!errors.firstName}
                helperText={helperFor('firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last name"
                value={formData.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                onBlur={() => handleBlur('lastName')}
                error={!!errors.lastName}
                helperText={helperFor('lastName')}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            error={!!errors.email}
            helperText={helperFor('email')}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Phone number"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            error={!!errors.phone}
            helperText={helperFor('phone')}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => updateField('password', e.target.value)}
            onBlur={() => handleBlur('password')}
            error={!!errors.password}
            helperText={helperFor('password')}
            sx={{ mb: 3 }}
          />

          <TextField
            fullWidth
            label="Confirm password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => updateField('confirmPassword', e.target.value)}
            onBlur={() => handleBlur('confirmPassword')}
            error={!!errors.confirmPassword}
            helperText={helperFor('confirmPassword')}
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
              mb: 1,
              borderRadius: '8px',
              textTransform: 'none',
              py: 1.5
            }}
          >
            Create account
          </Button>
          {submitError && (
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#d32f2f',
                textAlign: 'center',
                mb: 3
              }}
            >
              {submitError}
            </Typography>
          )}

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