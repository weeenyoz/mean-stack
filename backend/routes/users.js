const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const { User } = require('../models/users');

router.post('/new', async(req, res, next) => {
   console.log('~~ REQ BODY: ', req.body)
   const { newUsername, newPassword, newEmail, newIsAdmin } = req.body;
   const user = await User.findOne({email: newEmail});
   if (user) {
      res.status(400).send('User already exists');
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
});


module.exports = router;