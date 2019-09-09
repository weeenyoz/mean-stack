const express = require('express');
const app = express();  // a big chain of middleware we apply to the incoming request
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');

const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');


mongoose.connect('mongodb+srv://peter:c3ZouTPGoD1Asrgn@cluster0-z2ftf.mongodb.net/node-angular-1?retryWrites=true&w=majority')
.then(() => console.log('~~ Connected to MongoDB Atlas ~~'))
.catch(() => console.log('** Unable to conect to MongoDB Atlas **'));

if(!config.get('jwtPrivateKey')) {
   console.error('** jwtPrivateKey Token Is Not Defined. **');
   process.exit(1);
}
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;