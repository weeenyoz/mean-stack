const { User } = require('../models/users');

exports.adminDelete = async(req, res, next) => {

   const user = await User.findOne({_id: req.params.userId});
   if (!user) {
      res.status(404).send('User Not Found');
   } else {
      const result = await user.remove();
      console.log('~~Result ', result);
   }
   
}