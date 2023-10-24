const mongoose = require('mongoose');

const User = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  instaUserName: String,
  shortBio: String,
  country: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
});

module.exports = mongoose.model('User', User);
