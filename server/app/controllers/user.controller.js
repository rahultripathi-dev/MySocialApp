const countries = require("../data");
const User=require('../models/user.model')

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send({ok:true,userId:req.userId, massage:"success"});
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

  exports.countrylist = (req, res) => {
    res.status(200).send(countries);
  };

  exports.alluser = async (req, res) => {
    try {
      const postEntries = await User.find();

      // Extract the image URLs for each post
     
      res.status(200).json(postEntries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve users data' });
    }
  };

