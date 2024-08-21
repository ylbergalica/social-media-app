import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      {isRegistering ? <RegisterForm /> : <LoginForm />}
      <Typography>
        {isRegistering ? (
          <>
            Already have an account?{' '}
            <button href="#" onClick={toggleForm}>
              Sign in here
            </button>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <button onClick={toggleForm}>
              Register here
            </button>
          </>
        )}
      </Typography>
    </Box>
  );
}

export default Login;
