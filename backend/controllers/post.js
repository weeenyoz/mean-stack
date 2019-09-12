const { Post } = require('../models/post');

exports.getAllList = async (req, res) => {
   const allPosts = await Post.find();
   res.status(200).json({
      message: 'Posts fetched from backend',
      posts: allPosts
   });
}

exports.createNewPost = (req, res, next) => {
   const { title, content } = req.body;
   const post = new Post({
      title: title, 
      content: content,
      creator: req.user.id
   });
   post.save().then(createdPost => {
      res.status(201).json({
         message: `Nodejs: A post, ${createdPost}, added successfully :)`,
         postId: createdPost._id
      });
   })
   .catch(error => {
      res.status(500).json({message: 'An error occurred while creating a post!'})
   });
}

exports.getPostForEdit = (req, res) => {
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
   });
}

exports.editPost = async (req, res) => {
   const { id } = req.params;
   const { title, content } = req.body;
   const post = new Post({
      _id: id,
      title: title,
      content: content
   });
   // const result = await Post.updateOne({_id: id, creator: req.user.id}, post);
   // if (result.nModified > 0) {
   //    res.status(200).json({
   //       message: 'Post Updated Successfully :)',
   //       updatedPost: post
   //    });
   // } else {
   //    res.status(401).json({message: 'Update Failed, Unauthorised User'});
   // }
   Post.updateOne({_id: id, creator: req.user.id}, post)
   .then( result => {
      if (result.nModified > 0) {
         res.status(200).json({
            message: 'Post Updated Successfully :)',
            updatedPost: post
         });
      } else {
         res.status(401).json({message: 'Update Failed, Unauthorised User'});
      }
   })
   .catch(error => {
      res.status(500).json({message: 'An error occurred while creating a post!'});
   });
}

exports.deletePost = (req, res) => {
   Post.deleteOne({_id: req.params.id, creator: req.user.id}).then(result => {
      if (result.n > 0) {
         res.status(200).json({message: 'Post Deleted!'});
      } else {
         res.status(401).send('Delete Failed, Unauthorised User!');
      }
   });
}