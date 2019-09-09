const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 50
   },
   password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024
   },
   email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      unique: true
   },
   isAdmin: {
      type: Boolean,
      required: true,
      default: false
   }
});

userSchema.methods.generateAuthToken = function() {
   const token = jwt.sign({id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'), {expiresIn: '1h'});
   return 'Bearer ' + token;
}

const User = mongoose.model('User', userSchema);

exports.User = User;