import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Container, Typography, Box, Alert } from '@mui/material';
import { toast } from 'react-toastify';

import { registerUser } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

function RegisterForm() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== repeatPass) {
      toast.error('Passwords do not match');
      return;
    }
    else {
      registerUser(username, password).then(data => {
        if (data.userId) {
          auth.login(data.userId);
          toast.success('Welcome, ' + username);
          navigate('/');
        }
        else if (data.error) toast.error(data.error);
        else toast.error('Something went wrong');
      })
    }
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
        <TextField
          margin="normal"
          required
          fullWidth
          name="repeatPass"
          label="Repeat Password"
          type="password"
          id="repeatPass"
          value={repeatPass}
          onChange={(e) => setRepeatPass(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
}

export default RegisterForm;
