import { useState } from "react";
import { Box, Typography, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { useAuth } from "../../context/AuthContext";

import { updateUsername } from "../../services/api";
import { toast } from "react-toastify";

function UsernameField({ username, setUsername }) {
  const auth = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setTempUsername(username);
  };

  const handleSaveClick = () => {
    setUsername(tempUsername);
    updateUsername(auth.userId, tempUsername)
      .then(result => {
        if (result.user) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      })
      .catch(error => {
        toast.error('An error occurred while updating the username.');
      });
    setIsEditing(false);
  };

  const handleUsernameChange = (event) => {
    setTempUsername(event.target.value);
  };

  return (
    <Box sx={{ width: '50%', mb: 2, display: 'flex', flexDirection:'column', alignItems: 'center' }}>
      <Typography variant="h6">Username</Typography>
      {isEditing ? (
        <Box sx={{ display: 'flex' }}>
          <TextField
            variant="outlined"
            value={tempUsername}
            onChange={handleUsernameChange}
            size="small"
            sx={{ mr: 2 }}
          />
          <IconButton color="primary" onClick={handleSaveClick}>
            <CheckIcon />
          </IconButton>
          <IconButton color="secondary" onClick={handleCancelClick}>
            <CloseIcon />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid lightgrey', borderRadius: '5px' }}>
          <Typography variant="h6" sx={{ mx: 2 }}>{username}</Typography>
          <IconButton color="primary" onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  )
}

export default UsernameField;