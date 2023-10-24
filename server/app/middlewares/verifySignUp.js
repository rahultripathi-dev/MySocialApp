const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  console.log(req.body,"req?.body?.name===");
  try {
    const user = await User.findOne({ name: req?.body?.name }).exec();
    // console.log(user,"User===");
    if (user) {
      return res.status(400).send({ message: "Failed! Username is already in use!" });
    }

    const emailUser = await User.findOne({ email: req?.body?.email }).exec();
    if (emailUser) {
      return res.status(400).send({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (err) {
    // console.log(err);
    res.status(500).send({ message: err, status:500, ok:false });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req?.body?.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req?.body?.roles[i])) {
        return res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
