const model = require('../models/notification.model');
const {authJwt} = require('../middlewares');
const controller = require('../controllers/notification.controller');

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token');
    next();
  });

  // Rest of your code remains the same...
//   app.get('/notification/:id', [authJwt.verifyToken], controller.getPost);

  // Retrieve all post data
  app.get('/notification',  [authJwt.verifyToken],controller.getNotifications);



};
