import { Container, Typography, Box } from '@mui/material';

import PostCard from "./PostCard"

const PostList = ({ posts }) => {
  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', paddingTop: 10 }}>
      <Box sx={{ width: '100%', maxHeight: 'calc(100vh - 64px)', overflowY: 'auto', paddingBottom: 2 }}>
        {posts.map(entry => (
          <PostCard
            key={entry.id}
            post={entry} />
        ))}
      </Box>
    </Container>
  )
}

export default PostList;