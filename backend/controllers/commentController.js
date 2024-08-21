const db = require('../models');

const getPostComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await db.Comment.findAll({
      where: { postId },
      include: [
        {
          model: db.User,
          attributes: ['username'],
        }
      ]
    });
    
    if (comments) {
      res.status(200).json({ comments });
    } else {
      res.status(404).json({ error: "No comments yet." });
    }
  } catch (error) {
    console.error('Smth went wrong', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

const addComment = async (req, res) => {
  const { postId, userId, text } = req.body;

  try {
    const newComment = await db.Comment.create({
      postId,
      userId,
      text
    });

    const comment = await db.Comment.findOne({
      where: { id: newComment.id },
      include: [
        {
          model: db.User,
          attributes: ['username'],
        }
      ]
    });

    res.status(201).json({ comment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment.' });
  }
};

module.exports = {
  getPostComments,
  addComment
}