const express = require('express');
const router = express.Router();

const authoriseUser = require('../middleware/authoriseUser');
const authoriseAdmin = require('../middleware/authoriseAdmin');
const { User } = require('../models/users');

router.delete('/delete/:userId', authoriseUser, authoriseAdmin, async(req, res, next) => {

   const user = await User.findOne({_id: req.params.userId});
   if (!user) {
      res.status(404).send('User Not Found');
   } else {
      const result = await user.remove();
      console.log('~~Result ', result);
   }
});

module.exports = router;