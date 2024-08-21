import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';

import { getAllPosts, getPostsByDate } from '../../services/api';
import { toast } from 'react-toastify';
import PostList from './PostList';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortNewest, setSortNewest] = useState(false);

  const toggleSort = () => {
    setSortNewest((prevSort) => {
      return !prevSort;
    });
  };

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);

      try {
        const data = sortNewest ? await getPostsByDate() : await getAllPosts();
        setPosts(data.posts);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [sortNewest]);

  return (
    <Box sx={{ maxWidth: 'sm', margin: 'auto' }}>
      <Button
        variant="contained"
        sx={{ position: 'fixed', top: '5rem', left: '3rem', zIndex: 10 }}
        onClick={toggleSort}
      >
        {sortNewest ? 'Sort by Likes' : 'Sort by Newest'}
      </Button>

      {loading ? (
        <Container maxWidth="sm" sx={{ paddingTop: 10 }}>
          <Typography variant="h6">Loading...</Typography>
        </Container>
      ) : (
        <PostList posts={posts} />
      )}
    </Box>
  );
}

export default Home;