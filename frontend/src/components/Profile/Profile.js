import { useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';

import { getUserById } from '../../services/api';

import UsernameField from './UsernameField';
import ChangePass from './ChangePass';

import { useAuth } from '../../context/AuthContext';

function Profile() {
  const auth = useAuth();

  const [username, setUsername] = useState('');
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  const handleOpenPasswordDialog = () => {
    setPasswordDialogOpen(true);
  };

  const handleClosePasswordDialog = () => {
    setPasswordDialogOpen(false);
  };

  useEffect(() => {
    if (auth.userId) {
      getUserById(auth.userId).then((result) => {
        setUsername(result.user.username);
      })
    }
  }, [auth.userId])

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 10 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Profile
      </Typography>
      <UsernameField username={username} setUsername={setUsername} />
      <Box sx={{ mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h6">Password</Typography>
        <Button variant="outlined" onClick={handleOpenPasswordDialog}>
          Change Password
        </Button>
      </Box>
      <ChangePass
        open={passwordDialogOpen}
        onClose={handleClosePasswordDialog}
      />
    </Container>
  );
}

export default Profile;
