import { useEffect, useState } from 'react';
import { Box, Button, Container, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { deleteUser, getUserById } from '../../services/api';
import UsernameField from './UsernameField';
import ChangePass from './ChangePass';

import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

function Profile() {
  const auth = useAuth();

  const [username, setUsername] = useState('');
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleOpenPasswordDialog = () => {
    setPasswordDialogOpen(true);
  };

  const handleClosePasswordDialog = () => {
    setPasswordDialogOpen(false);
  };

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteAccount = () => {
    deleteUser(auth.userId)
      .then(result => {
        if (result.message) {
          toast.success(result.message);
        } else {
          toast.error(result.error);
        }
      })
      .catch(error => {
        toast.error('An error occurred.');
      });

    auth.logout();
  };

  const handleLogout = () => {
    auth.logout();
  };

  useEffect(() => {
    if (auth.userId) {
      getUserById(auth.userId).then((result) => {
        setUsername(result.user.username);
      });
    }
  }, [auth.userId]);

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

      <Box sx={{ mt: 4, width: '50%', display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" color="error" onClick={handleOpenDeleteDialog} >
          Delete Account
        </Button>
        <Button variant="contained" color="primary" onClick={handleLogout} >
          Logout
        </Button>
      </Box>

      <ChangePass open={passwordDialogOpen} onClose={handleClosePasswordDialog} />
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteAccount} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Profile;