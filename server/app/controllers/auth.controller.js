const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  signup: async (req, res) => {
    try {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        country: req.body.country,
        instaUserName: req.body.instaUserName,
        role: req.body.role,
        shortBio: req.body.shortBio,
      });

      const savedUser = await user.save();

      if (req.body.roles) {
        const roles = await Role.find({name: {$in: req.body.roles}});
        savedUser.roles = roles.map(role => role._id);
      } else {
        const defaultRole = await Role.findOne({name: 'user'});
        savedUser.roles = [defaultRole._id];
      }

      await savedUser.save();

      res.send({message: 'User was registered successfully!'});
    } catch (err) {
      res.status(500).send({message: err});
    }
  },

  signin: async (req, res) => {
    console.log(req.body);
    try {
      const user = await User.findOne({
        email: req.body.email,
      }).populate('roles', '-__v');
      console.log(user);
      if (!user) {
        return res.status(404).send({message: 'User Not found.'});
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        });
      }

      const token = jwt.sign({id: user.id}, config.secret, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: '24h', // 24 hours
      });

      const authorities = user.roles.map(
        role => 'ROLE_' + role.name.toUpperCase(),
      );

      res.status(200).send({
        id: user._id,
        name: user.name,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({message: err});
    }
  },
};
