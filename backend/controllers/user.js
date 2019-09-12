const { User } = require('../models/users');
const bcrypt = require('bcrypt');

exports.userSignUp = async(req, res, next) => {
   const { newUsername, newPassword, newEmail, newIsAdmin } = req.body;
   const user = await User.findOne({email: newEmail});
   if (user) {
      res.status(400).json({
         message : 'User already exists'
      });
   } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPw = await bcrypt.hash(newPassword, salt);
      const newUser = new User({
         username: newUsername,
         password: hashedPw,
         email: newEmail,
         isAdmin: newIsAdmin
      });
      const registeredUser = await newUser.save();
      const { username, email, isAdmin } = registeredUser;
      let userCreated = isAdmin ? 'New User(Admin) Created' : 'New User Created';
      res.status(201).json({
         message: userCreated,
         user: {
            registeredUsername: username,
            registeredEmail: email
         }
      });
   }
}

exports.userLogin = async(req, res, next) => {
   const { loginEmail, loginPassword } = req.body;
   const user = await User.findOne({email: loginEmail});
   if(!user) {
      return res.status(404).json({message: 'User Not Found'}); 
   } else {
      const isValidPw = await bcrypt.compare(loginPassword, user.password);
      if (!isValidPw) {
         return res.status(400).json({message: 'Invalid Credentials'}); 
      } else {
         const token = user.generateAuthToken();
         res.header('x-auth-token', token).status(200).json({
            message: 'Logged In Successfully',
            token: token,
            userId: user._id,
            expiresIn: 3600
         });
      }
   }
}