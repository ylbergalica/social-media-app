const express = require('express');
const userCont = require('../controllers/userControllers');

const router = express.Router();

router.get('/users', userCont.getAllUsers);

router.post('/users', userCont.registerUser);

router.post('/login', userCont.loginUser)

module.exports = router;