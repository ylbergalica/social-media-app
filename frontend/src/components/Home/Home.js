import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import PostList from './PostList';
import { getAllPosts, getPostsByDate } from '../../services/api';
import NewPostDialog from './NewPost';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortNewest, setSortNewest] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const toggleSort = () => {
    setSortNewest((prevSort) => !prevSort);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handlePostCreated = () => {
    setLoading(true);
    const getPosts = async () => {
      try {
        const data = sortNewest ? await getPostsByDate() : await getAllPosts();
        setPosts(data.posts);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  };

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);

      try {
        const data = sortNewest ? await getPostsByDate() : await getAllPosts();
        setPosts(data.posts);
      } catch (error) {
        toast.error(error.message);
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

      <Button
        variant="contained"
        sx={{ position: 'fixed', top: '9rem', left: '3rem', zIndex: 10 }}
        onClick={handleDialogOpen}
        startIcon={<CloudUploadIcon />}
      >
        New Post
      </Button>

      {loading ? (
        <Container maxWidth="sm" sx={{ paddingTop: 10 }}>
          <Typography variant="h6">Loading...</Typography>
        </Container>
      ) : (
        <PostList posts={posts} />
      )}

      <NewPostDialog open={openDialog} onClose={handleDialogClose} onPostCreated={handlePostCreated} />
    </Box>
  );
}

export default Home;
