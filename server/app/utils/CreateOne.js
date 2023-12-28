const catchAsync = require("./catchAsync");

  // Sample factory function for creating a document
  exports.createOne = (Model) => async (req, res) => {
    const doc = await Model.create(req);
  
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  }