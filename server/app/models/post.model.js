const mongoose = require('mongoose');

const userPost = new mongoose.Schema({
  image: String,
  location: String,
  description: String,
  likes:[String],
  dislikes:Number,
  userId:String
});

module.exports = mongoose.model('userPost', userPost);
