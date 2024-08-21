import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem, ListItemText, Box, TextField } from '@mui/material';
import { toast } from 'react-toastify';

import { useAuth } from '../../context/AuthContext';

import { addComment, getPostComments } from '../../services/api';

function CommentSection({ open, onClose, postId }) {
  const auth = useAuth();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (newComment.trim() === '') return;

    setLoading(true);
    try {
      const result = await addComment(postId, auth.userId, newComment);
      setComments(prevComments => [
        ...prevComments,
        {
          User: { username: result.comment.User.username },
          text: result.comment.text
        }
      ]);
      setNewComment('');
      toast.success('Comment added!');
    } catch (error) {
      toast.error('Could not add comment!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && comments.length == 0) {
      getPostComments(postId).then(result => {
        setComments(result.comments);
      })
    }
  }, [open, postId])

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle sx={{ width: '30%', display: 'inline' }}>Comments</DialogTitle>
        <DialogActions sx={{ display: 'inline' }}>
          <Button onClick={onClose} color="primary">
            X
          </Button>
        </DialogActions>
      </Box>
      <DialogContent sx={{ paddingTop: 0 }}>
        <List>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemText
                  primary={<strong>{comment.User.username}</strong>}
                  secondary={comment.text}
                />
              </ListItem>
            ))
          ) : (
            <Typography>No comments yet.</Typography>
          )}
        </List>
        <form onSubmit={handleCommentSubmit} style={{ marginTop: 16, display: 'flex', justifyContent: 'space-evenly' }}>
          <TextField
            label="Add a comment"
            variant="outlined"
            value={newComment}
            onChange={handleCommentChange}
            disabled={loading}
            sx={{ width: '80%' }}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CommentSection;
