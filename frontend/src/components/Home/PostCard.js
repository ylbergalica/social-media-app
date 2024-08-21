import { useEffect, useState } from 'react';

import { Typography, Card, CardContent, CardMedia, CardActions, Button, Icon, IconButton } from '@mui/material';
import { AccountCircle, ThumbUp, ThumbUpOutlined } from '@mui/icons-material';

import { getUserById, isPostLiked, toggleLike } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const PostCard = ({ post }) => {
  const auth = useAuth();

  const [username, setUsername] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const handleToggleLike = () => {
    toggleLike(post.id, auth.userId).then(result => {
      setIsLiked(result.isLiked);
    })
  }

  useEffect(() => {
    getUserById(post.userId).then(result => {
      setUsername(result?.user.username || '');
    })

    isPostLiked(post.id, auth.userId).then(result => {
      setIsLiked(result.isLiked);
    })
  }, [])

  return (
    <Card key={post.id} sx={{ marginBottom: 3 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Icon>
          <AccountCircle />
        </Icon>
        <Typography variant="h6">{username}</Typography>
      </CardContent>
      {post.image && (
        <CardMedia
          component="img"
          width="300"
          image={post.image}
        />
      )}
      <CardContent>
        <Typography variant="body1">{post.text}</Typography>
        <Typography variant="body2" color="textSecondary">
          {post.likes} likes
        </Typography>
        {/* {post.comments.map((comment, index) => (
              <Typography key={index} variant="body2" color="textSecondary">
                <strong>{comment.username}:</strong> {comment.text}
              </Typography>
            ))} */}
      </CardContent>
      <CardActions>
        <IconButton size="small" color="primary" onClick={handleToggleLike}>
          {isLiked ? (
            <ThumbUp />
          ) : (
            <ThumbUpOutlined />
          )}
        </IconButton>
        <Button size="small" color="primary">
          Comments
        </Button>
      </CardActions>
    </Card>
  )
}

export default PostCard;