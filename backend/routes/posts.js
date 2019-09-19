const express = require('express');
const router = express.Router()
const authoriseUser = require('../middleware/authoriseUser');
const { getAllList, createNewPost, getPostForEdit, editPost, deletePost } = require('../controllers/post');

router.get('/', getAllList);
router.post('/new', authoriseUser, createNewPost);
router.get('/edit/:id', authoriseUser, getPostForEdit);
router.put('/edit/:id', authoriseUser, editPost);
router.delete('/delete/:id', authoriseUser, deletePost);

module.exports = router;