const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./app/models');
const path = require('path');
const multer = require('multer');
// var admin = require('firebase-admin');

// db
const dbConfig = require('./app/config/db.config');

const Role = db.role;

let url = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;

db.mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connect to MongoDB.');
    initial();
  })
  .catch(err => {
    console.error('Connection error', err);
    process.exit();
  });

// set port, listen for requests, express config
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count === 0) {
      await new Role({name: 'user'}).save();
      console.log("added 'user' to roles collection");

      await new Role({name: 'moderator'}).save();
      console.log("added 'moderator' to roles collection");

      await new Role({name: 'admin'}).save();
      console.log("added 'admin' to roles collection");
    }
  } catch (err) {
    console.error('error', err);
  }
}

let corsOptions = {
  origin: 'http://localhost:8080',
};

app.use(cors(corsOptions));

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/images'); // Destination directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename uploaded files
  },
});

const upload = multer({storage}).single('image');

// parse requests of content-type - application/x-www-form-urlencoded
app.use('/uploads/images', express.static('./uploads/images'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/country.routes')(app);
require('./app/routes/post.routes')(app, upload);
require('./app/routes/notification.routes')(app);
module.exports = app;

// notification

// var serviceAccount = require('./socialapp-e95b1-firebase-adminsdk-mgc7y-7bae574f6f.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
