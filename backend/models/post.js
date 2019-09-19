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
   },
   creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   }
});

const Post = mongoose.model('Post', postSchema);

exports.Post = Post;