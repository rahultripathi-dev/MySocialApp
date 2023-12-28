// Sample AppError class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // Capture the stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

  

  
  // // Usage in your registerNotification function
  // exports.registerNotification = catchAsync(async (req, res, next) => {
  //   const { user, tokenID } = req.body;
  
  //   const objID = mongoose.Types.ObjectId.isValid(user)
  //     ? mongoose.Types.ObjectId(user)
  //     : null;
  
  //   if (!objID) {
  //     return next(new AppError('Invalid User ID', 400));
  //   }
  
  //   const obj = await Notification.findOne({ user: user });
  
  //   if (obj) {
  //     return res.status(200).json({
  //       status: 'success',
  //       data: {
  //         message: 'Token already registered!',
  //       },
  //     });
  //   }
  
  //   // Use the factory function to create a document
  //   return createOne(Notification)(req, res, next);
  // });
  