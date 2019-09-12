const express = require('express');
const router = express.Router();
const { userLogin } = require('../controllers/user');

router.post('/login', userLogin);

module.exports = router;