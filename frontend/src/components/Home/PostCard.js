import { useEffect, useState } from 'react';

import { Typography, Card, CardContent, CardMedia, CardActions, Button, Icon, IconButton } from '@mui/material';
import { AccountCircle, ThumbUp, ThumbUpOutlined } from '@mui/icons-material';

import { getUserById, isPostLiked, toggleLike } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

import CommentSection from '../Comments/CommentSection';

const PostCard = ({ post }) => {
  const auth = useAuth();

  const [username, setUsername] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  const [isCommentSectionOpen, setCommentSectionOpen] = useState(false);

  const handleOpenComments = () => {
    setCommentSectionOpen(true);
  };

  const handleCloseComments = () => {
    setCommentSectionOpen(false);
  };


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

    if (post.image) {
      const buffer = new Uint8Array(post.image.data);
      const base64String = btoa(
        buffer.reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      const mimeType = post.image.mimetype;

      setImageSrc(`data:image/${mimeType};base64,${base64String}`);
    }
  }, [post])

  return (
    <>
      <Card key={post.id} sx={{ marginBottom: 3 }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
          <Icon>
            <AccountCircle />
          </Icon>
          <Typography variant="h6">{username}</Typography>
        </CardContent>
        {imageSrc && (
          <CardMedia
            component="img"
            width="300"
            image={imageSrc}
          />
        )}
        <CardContent>
          <Typography variant="body1">{post.text}</Typography>
          <Typography variant="body2" color="textSecondary">
            {post.likes} likes
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size="small" color="primary" onClick={handleToggleLike}>
            {isLiked ? (
              <ThumbUp />
            ) : (
              <ThumbUpOutlined />
            )}
          </IconButton>
          <Button size="small" color="primary" onClick={handleOpenComments}>
            Comments
          </Button>
        </CardActions>
      </Card>

      <CommentSection
        open={isCommentSectionOpen}
        onClose={handleCloseComments}
        postId={post.id}
      />
    </>
  )
}

export default PostCard;