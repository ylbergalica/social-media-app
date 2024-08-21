import { Typography, Card, CardContent, CardMedia, CardActions, Button, Icon } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const PostCard = ({ post }) => {
  return (
    <Card key={post.id} sx={{ marginBottom: 3 }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <Icon>
          <AccountCircle />
        </Icon>
        <Typography variant="h6">{post.userId}</Typography>
      </CardContent>
      {post.image.data.length > 0 && (
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
        <Button size="small" color="primary">
          Like
        </Button>
        <Button size="small" color="primary">
          Comment
        </Button>
      </CardActions>
    </Card>
  )
}

export default PostCard;