const express = require('express');
const userCont = require('../controllers/userController');

const router = express.Router();

router.get('/users', userCont.getAllUsers);
router.post('/users', userCont.registerUser);
router.post('/login', userCont.loginUser);

module.exports = router;