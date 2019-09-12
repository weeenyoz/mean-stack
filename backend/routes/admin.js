const express = require('express');
const router = express.Router();

const authoriseUser = require('../middleware/authoriseUser');
const authoriseAdmin = require('../middleware/authoriseAdmin');
const { adminDelete } = require('../controllers/admin');

router.delete('/delete/:userId', authoriseUser, authoriseAdmin, adminDelete);

module.exports = router;