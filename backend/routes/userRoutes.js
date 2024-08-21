const express = require('express');
const userCont = require('../controllers/userController');

const router = express.Router();

router.get('/users', userCont.getAllUsers);
router.post('/register', userCont.registerUser);
router.post('/login', userCont.loginUser);
router.get('/user/:id', userCont.getUserById);

module.exports = router;