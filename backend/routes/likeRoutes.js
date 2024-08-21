const express = require('express');
const likeCont = require('../controllers/likeController');

const router = express.Router();

router.get('/likeStatus', likeCont.isPostLiked);
router.post('/toggleLike', likeCont.toggleLike);

module.exports = router;