import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';

import { loginUser } from "../../services/api.js"

import { useAuth } from '../../context/AuthContext.js';

function LoginForm() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    loginUser(username, password).then(data => {
      if (data.userId) {
        auth.login(data.userId);
        toast.success('Welcome, ' + username);
        navigate('/');
      } else {
        toast.error('Invalid username or password');
      }
    })
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
}

export default LoginForm;
