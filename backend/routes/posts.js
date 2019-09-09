const express = require('express');
const router = express.Router()
const { Post } = require('../models/post');
const authoriseUser = require('../middleware/authoriseUser');

router.get('/', async (req, res) => {
   const allPosts = await Post.find();
   res.status(200).json({
      message: 'Posts fetched from backend',
      posts: allPosts
   });
});

router.post('/new', authoriseUser, (req, res, next) => {
   console.log('USER: ', req.user)
   const { title, content } = req.body;
   const post = new Post({title: title, content: content});
   post.save().then(createdPost => {
      res.status(201).json({
         message: `Nodejs: A post, ${createdPost}, added successfully :)`,
         postId: createdPost._id
      });
   });
});

router.get('/edit/:id', authoriseUser, (req, res) => {
   Post.findById(req.params.id).then(post => {
      if (post) {
         const {_id, title, content} = post
         res.status(200).json({
            message: 'Post Found :)',
            post: {
               id: _id,
               title: title,
               content: content
            }
         });
      } else {
         res.status(404).json({
            message: 'Post not found :('
         });
      }
   }
   )
});

router.put('/edit/:id', authoriseUser, async (req, res) => {
   const { id } = req.params;
   const { title, content } = req.body;
   const post = new Post({
      _id: id,
      title: title,
      content: content
   });
   const result = await Post.updateOne({_id: id}, post);
   if (result) {
      const { _id, title, content } = post;
      res.status(200).json({
         message: 'Post Updated Successfully :)',
         updatedPost: {
            id: _id,
            title: title,
            content: content
         }
      });
   } else {
      res.status(400).send('Updare Failed :(');
   }
});

router.delete('/delete/:id', authoriseUser, (req, res) => {
   Post.deleteOne({_id: req.params.id}).then(
      result => {
         res.status(200).send({
            message: 'Post deleted'
         });
      },
      error => {
         console.log('Unable to delete: ', error);
      }
   );
});

module.exports = router;