const express = require('express');
const notificationController = require('../controllers/notification.controller');


module.exports = (app, upload) => {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token');
    next();
  });
  app.post('/api/uploads',notificationController.sendNotification);


};

// const router = express.Router();

// router.post('/send', notificationController.sendNotification);

// router
//   .route('/')
//   .get(notificationController.getNotifications)
//   .post(notificationController.registerNotification)
//   .patch(notificationController.updateNotification);

// module.exports = router;
