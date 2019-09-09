const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const { User } = require('../models/users');

router.post('/login', async(req, res, next) => {
   const { loginEmail, loginPassword } = req.body;
   console.log('** REQ BODY **: ', req.body);
   const user = await User.findOne({email: loginEmail});
   
   if(!user) {
      return res.status(404).send('User Not Found'); 
   } else {
      const isValidPw = await bcrypt.compare(loginPassword, user.password);
      console.log('PW Is Valid: ', isValidPw)
      if (!isValidPw) {
         return res.status(400).send('Invalid Credentials'); 
      } else {
         const token = user.generateAuthToken();
         res.header('x-auth-token', token).status(200).json({
            message: 'Logged In Successfully',
            token: token,
            expiresIn: 3600
         });
      }
   }
});

module.exports = router;