const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  city: String,
  country: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  fcmToken: String,
  profilePhoto: String,
  coverPhoto: String,
});

module.exports = mongoose.model("User", User);
