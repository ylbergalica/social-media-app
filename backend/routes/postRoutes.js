const express = require('express');
const multer = require('multer');
const postCont = require('../controllers/postController');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/posts', postCont.getAllPosts);
router.get('/new-posts', postCont.getPostsByDate);
router.post('/posts', upload.single('image'), postCont.createPost);

module.exports = router;