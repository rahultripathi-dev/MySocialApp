const catchAsync = (fn) => {
  return (req, res, next) => {
    const result = fn(req, res, next);
    
    // Check if result is a promise (an asynchronous function)
    if (result instanceof Promise) {
      result.catch((err) => next(err));
    } else {
      // Wrap the result in a Promise to ensure it works with .catch()
      Promise.resolve(result).catch((err) => next(err));
    }
  };
};

module.exports = catchAsync;








