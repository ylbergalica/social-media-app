import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Container sx={{ display: 'flex', justifyContent: 'space-between' }} >
          <Box>
            <Typography variant="h6" marginRight='3rem' display='inline'>
              SocialApp
            </Typography>
            <Button color="inherit" sx={{ marginRight: '1rem' }} component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/users">
              Users
            </Button>
          </Box>
          <Box>
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;