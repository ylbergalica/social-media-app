const express = require('express');
const postCont = require('../controllers/postController');

const router = express.Router();

router.get('/posts', postCont.getAllPosts);
router.post('/posts', postCont.createPost);

module.exports = router;