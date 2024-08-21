const db = require('../models');
const { decrementLikes, incrementLikes } = require('./postController');

const isPostLiked = async (req, res) => {
  const { postId, userId } = req.query;

  try {
    const like = await db.Like.findOne({ where: { userId, postId } });
    
    if (like) {
      res.status(200).json({ isLiked: true });
    } else {
      res.status(200).json({ isLiked: false });
    }
  } catch (error) {

    console.error('Error fetching like status:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

const toggleLike = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const existingLike = await db.Like.findOne({ where: { userId, postId } });

    if (existingLike) {
      await db.Like.destroy({ where: { userId, postId } });
      await decrementLikes(postId);

      res.status(200).json({ message: 'Post unliked', isLiked: false });
    } else {
      await db.Like.create({ userId, postId });
      await incrementLikes(postId);

      res.status(200).json({ message: 'Post liked', isLiked: true });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle like' });
  }
};

module.exports = {
  isPostLiked,
  toggleLike
}