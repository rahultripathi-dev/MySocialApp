const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userID: String,
  tokenID:String,
  notifications: Object,
  postId:String,
  // data: {
  //   type: Object,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Notification', notificationSchema);