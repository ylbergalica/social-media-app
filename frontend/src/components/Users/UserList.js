import { Box, Paper, Typography } from '@mui/material';

const UserList = ({ users, searchQuery }) => {
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
      {filteredUsers.map(user => (
        <Paper key={user.id} sx={{ padding: 2, margin: 1 }}>
          <Typography variant="h6">{user.username}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default UserList;