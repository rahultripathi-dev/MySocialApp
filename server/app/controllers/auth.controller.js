const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");

exports.signup = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      city: null,
      country: null,
      profilePhoto: null,
      coverPhoto: null,
      role: null,
      fcmToken: req.body.fcmToken,
    });
    const savedUser = await user.save();
    if (req.body.roles) {
      const roles = await Role.find({ name: { $in: req.body.roles } });
      savedUser.roles = roles.map((role) => role._id);
    } else {
      const defaultRole = await Role.findOne({ name: "user" });
      savedUser.roles = [defaultRole._id];
    }
    await savedUser.save();
    res.send({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.signin = async (req, res) => {
  console.log(req?.body);
  try {
    const user = await checkUser(req.body.email);
    console.log(user, "user");
    if (!user) {
      res.status(404).send({ message: "User Not found." });
    }
    const passwordIsValid = bcrypt.compareSync(
      req?.body?.password,
      user?.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "24h", // 24 hours
    });

    const authorities = user.roles.map(
      (role) => "ROLE_" + role.name.toUpperCase()
    );
    user.fcmToken = req?.body?.fcmToken;
    await user.save();
    res.status(200).send({
      id: user._id,
      name: user.name,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

exports.googleSignIn = async (req, res) => {
  try {
    const userFound = await checkUser(req.body.email);
    console.log(userFound, "user");
    if (!userFound) {
      const validatedUser = await validateGoogleUser(req?.body?.idToken);
      console.log(req.body.fcmToken, "validatedUser==");
      if (validatedUser.email_verified) {
        const { email, picture, name } = validatedUser;
        const user = new User({
          name: name,
          email: email,
          password: bcrypt.hashSync(email, 8),
          city: null,
          country: null,
          profilePhoto: picture,
          coverPhoto: null,
          role: null,
          fcmToken: req.body.fcmToken,
        });
        await user.save();
        if (req.body.roles) {
          const roles = await Role.find({ name: { $in: req.body.roles } });
          user.roles = roles.map((role) => role?._id);
        } else {
          const defaultRole = await Role.findOne({ name: "user" });
          user.roles = [defaultRole._id];
        }
        await user.save();
      }
    }
    const userData = await checkUser(req.body.email);
    if(userFound){
      userData.fcmToken=req.body.fcmToken;
      await userData.save()
    }
    
    const token = jwt.sign({ id: userData.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "24h", // 24 hours
    });

    const authorities = userData.roles.map(
      (role) => "ROLE_" + role.name.toUpperCase()
    );
    res.status(200).send({
      id: userData._id,
      name: userData.name,
      email: userData.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

exports.verifyotp = async (req, res) => {
  console.log(req.body);
  try {
    const user = await checkUser(req.body.email);
    console.log(user);
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "24h", // 24 hours
    });

    const authorities = user.roles.map(
      (role) => "ROLE_" + role.name.toUpperCase()
    );
    user.fcmToken = req?.body?.fcmToken;
    await user.save();
    res.status(200).send({
      id: user._id,
      name: user.name,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

async function validateGoogleUser(token) {
  const client = new OAuth2Client();
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      // audience: '114191886860895975273',  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = await ticket.getPayload();
    return payload;
  } catch (error) {
    console.error(error);
  }
}

async function checkUser(email) {
  return await User.findOne({
    email,
  }).populate("roles", "-__v");
}
