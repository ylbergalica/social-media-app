const db = require('../models');

const getAllPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = await db.Post.create(req.body);
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

module.exports = {
  getAllPosts,
  createPost
};