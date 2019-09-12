const express = require('express');
const router = express.Router();
const { userSignUp } = require('../controllers/user');

router.post('/signup', userSignUp);


module.exports = router;