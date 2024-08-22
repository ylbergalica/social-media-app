import { useEffect, useState } from 'react';
import { Container, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';

import { getAllUsers } from '../../services/api';

import UserList from './UserList';

function Users() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getAllUsers().then(data => {
      if (data.error) toast.error(data.error)
      else setUsers(data);

      console.log(data);
    });
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ my: 3 }}>
        User Directory
      </Typography>
      <TextField
        fullWidth
        label="Search by username"
        variant="outlined"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
      />
      <UserList users={users} searchQuery={searchQuery} />
    </Container>
  );
}

export default Users;