const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
   title: {
      type: String,
      required: true,
      minlength: 1
   },
   content: {
      type: String,
      required: true,
      minlength: 1
   }
});

const Post = mongoose.model('Post', postSchema);

exports.Post = Post;