import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import { createPost } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const NewPost = ({ open, onClose, onPostCreated }) => {
  const auth = useAuth();
  
  const [formData, setFormData] = useState({ text: '', image: null });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { image, text } = formData;

    if (text.trim() == '') {
      toast.error('Post text cannot be empty!')
      return;
    }
    
    const postData = new FormData();
    postData.append('userId', auth.userId);
    postData.append('text', text);
    if (image) {
      postData.append('image', image);
    }

    createPost(postData)
      .then(result => {
        if (result.newPost) {
          toast.success('Post created successfully');
          onPostCreated();
          onClose();
        }
      })
      .catch(error => {
        toast.error('An unexpected error occurred');
      });
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a New Post</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            name="text"
            label="Post Text"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.text}
            onChange={handleInputChange}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginTop: 16 }}
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Submit</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPost;
