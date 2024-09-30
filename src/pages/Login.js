import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
  bgcolor: theme.palette.background.paper,
  padding: '20px',
  borderRadius: '8px',
  boxShadow: theme.shadows[5],
  color: theme.palette.text.primary,
}));

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://blog-be-qibp.onrender.com/api/auth/login', { email, password });
      console.log("Login response:", response.data);
      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      setError('Invalid email or password.');
    }
  };

  return (
    <Container maxWidth="xs">
      <StyledBox>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </StyledBox>
    </Container>
  );
}

export default Login;
