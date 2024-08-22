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
    console.log(req.body)
    console.log('File:', req.file)
    
    const { userId, text } = req.body;
    const image = req.file ? req.file.buffer : null;

    const newPost = await db.Post.create({
      userId,
      text,
      image
    });

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