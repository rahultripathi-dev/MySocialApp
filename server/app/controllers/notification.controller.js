// importing utils
const catchAsync = require('../utils/catchAsync.js');
const AppError = require('../utils/appError');
const factory = require('../utils/CreateOne.js');
const mongoose = require('mongoose');
const Notification = require('../models/notification.model.js');
const admin = require('firebase-admin');
var serviceAccount = require('../../socialapp-e95b1-firebase-adminsdk-mgc7y-7bae574f6f.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const notification = {
  title:"name",
  body:'❤ liked your photo.',
  data: {
    navigate: 'Xray',
    image: 'default',
    data: null,
  },
  android: {
    smallIcon: 'logo_circle',
    channelId: 'default',
    importance: 4,
    pressAction: {
      id: 'default',
    },
    actions: [
      {
        title: 'Mark as Read',
        pressAction: {
          id: 'read',
        },
      },
    ],
  },
};

exports.registerNotification = async (req, res) => {
  const {likedPost, fcmToken, likedbyUser} = req;
  console.log(likedPost.image, "likedPost")
  console.log(likedbyUser.name, "likedbyUser")

  notification.title=likedbyUser?.name
  notification.data.image=`http://localhost:8080/uploads/images/${likedPost?.image}`
  await admin.messaging().sendMulticast({
    tokens: [fcmToken],
    data: {
      notifee: JSON.stringify(notification),
    },
  });
  //  console.log(userId,fcmToken,postId,notification)
  const newnotification = new Notification({
    userID: likedbyUser?._id,
    tokenID: fcmToken,
    notifications: notification,
    postId: likedPost?._id,
  });
  console.log(notification);
  newnotification.save();
};

exports.updateNotification = catchAsync(async (req, res, next) => {
  const userID = req?.query?.userid;

  const objID = mongoose.Types.ObjectId.isValid(userID)
    ? mongoose.Types.ObjectId(userID)
    : null;

  if (!objID) {
    return next(new AppError('Invalid User ID', 400));
  }

  const obj = await Notification.findOne({user: userID});

  if (!obj) {
    return next(new AppError('No Document Found', 404));
  }

  req.params.id = obj._id;
  return factory.updateOne(Notification)(req, res, next);
});

exports.sendNotification = catchAsync(async (req, res, next) => {
  try {
    const {title, body, navigate, tokenID, image, user, data} = req.body;

    const obj = await Notification.findOne({user: user});

    if (!obj) {
      return next(
        new AppError('No Such User with Notifications Object Found', 404),
      );
    }

    const notification = {
      title: title ? title : 'Results Are Ready!',
      body: body ? body : 'Click here to view your results',
      data: {
        navigate: navigate ? navigate : 'Xray',
        image: image ? image : 'default',
        data: data ? data : null,
      },
      android: {
        smallIcon: 'logo_circle',
        channelId: 'default',
        importance: 4,
        pressAction: {
          id: 'default',
        },
        actions: [
          {
            title: 'Mark as Read',
            pressAction: {
              id: 'read',
            },
          },
        ],
      },
    };

    obj.notifications.push(notification);
    await obj.save();

    await admin.messaging().sendMulticast({
      tokens: [tokenID],
      data: {
        notifee: JSON.stringify(notification),
      },
    });

    res.status(200).json({message: 'Successfully sent notifications!'});
  } catch (err) {
    res
      .status(err.status || 500)
      .json({message: err.message || 'Something went wrong!'});
  }
});

exports.getNotifications = async (req, res, next) => {
  try {
    const Notifications = await Notification.find();

    // Extract the image URLs for each post
    console.log(Notifications);
    res.status(200).json(Notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Failed to retrieve  data'});
  }
};
