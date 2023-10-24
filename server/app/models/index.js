const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const array=[]

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.post = require("./post.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;