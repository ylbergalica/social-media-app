import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { updatePassword } from '../../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

function ChangePass({ open, onClose }) {
  const auth = useAuth();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSave = () => {
    if (newPassword === repeatPassword) {
      updatePassword(auth.userId, oldPassword, newPassword)
        .then(result => {
          if (result.user) {
            toast.success(result.message);
            onClose();
          } else {
            toast.error(result.error);
          }
        })
        .catch(error => {
          toast.error('An error occurred while updating the username.');
        });
    } else {
      toast.error('Passwords do not match');
    };
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Old Password"
          type="password"
          variant="outlined"
          sx={{ mb: 2 }}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <TextField
          fullWidth
          label="New Password"
          type="password"
          variant="outlined"
          sx={{ mb: 2 }}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          fullWidth
          label="Repeat New Password"
          type="password"
          variant="outlined"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangePass;
