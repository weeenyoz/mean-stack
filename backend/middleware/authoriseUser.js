const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
   const token = req.header('Authorization').split(" ")[1];
   console.log('** Auth User Middleware: ', token);
   if (!token) {
      res.status(401).send('Access Denied. No token provided');
   } else {
      try {
         const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
         req.user = decodedPayload;
         next();
      } catch (ex) {
         res.status(400).send('Invalid Token');
      }
   }

}