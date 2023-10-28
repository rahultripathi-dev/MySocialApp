const userPost = require('../models/post.model');
const {authJwt} = require('../middlewares');
const path = require('path');
const controller = require('../controllers/post.controller');

module.exports = (app, upload) => {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'x-access-token');
    next();
  });
  app.post('/api/uploads', [authJwt.verifyToken], upload, controller.addPost);

  // Rest of your code remains the same...
  app.get('/uploads/:id', [authJwt.verifyToken], controller.getPost);

  // Retrieve all post data
  app.get('/uploads', [authJwt.verifyToken], controller.getAllPosts);

  // API endpoint for updating likes of a specific post
  app.put(
    '/api/uploads/:postId/likes',
    [authJwt.verifyToken],
    controller.updatePost,
  );


};
