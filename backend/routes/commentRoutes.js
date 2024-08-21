const express = require('express');
const commentCont = require('../controllers/commentController');

const router = express.Router();

router.get('/comments/:postId', commentCont.getPostComments);
router.post('/comments', commentCont.addComment);

module.exports = router;