const db = require('../models');

const getAllPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      order: [['likes', 'DESC']]
    });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
}

const getPostsByDate = async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      order: [['createdAt', 'ASC']]
    });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = await db.Post.create(req.body);
    res.status(200).json({ newPost });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

const incrementLikes = async (postId) => {
  try {
    await db.Post.increment('likes', { where: { id: postId } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to increment likes.' });
  }
};

const decrementLikes = async (postId) => {
  try {
    await db.Post.decrement('likes', { where: { id: postId } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to decrement likes.' });
  }
};


module.exports = {
  getAllPosts,
  getPostsByDate,
  createPost,
  incrementLikes,
  decrementLikes
};