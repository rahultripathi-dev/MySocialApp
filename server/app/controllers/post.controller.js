const userPost = require('../models/post.model');
const user = require('../models/user.model');
const notificationController = require('./notification.controller');

exports.addPost = async (req, res) => {
  try {
    const {location, description, likes} = req.body;
    const post = new userPost({
      image: req.file ? req.file.filename : '',
      location,
      description,
      likes,
      userId: req.userId,
    });
    await post.save();
    res.status(201).json({
      data: {
        ...post._doc,
        url: `http://localhost:8080/uploads/images/${req.file.filename}`, // Use req.file.filename to construct the URL
      },
      message: 'photo uploaded successfully', // Corrected the spelling of "message"
      ok: true,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({error: error || 'Failed to create form data entry'});
  }
};

exports.getPost = async (req, res) => {
  try {
    const formData = await userPost.findById(req.params.id);
    if (!formData) {
      return res.status(404).json({error: 'Form data entry not found'});
    }

    // Construct the path to the image file
    // const imagePath = path.join(__dirname, '../../uploads/images/', formData.image);
    // Use res.sendFile to send the image file as a response
    // res.sendFile(imagePath);

    const imageURL = `http://localhost:8080/uploads/images/${formData.image}`;

    res.status(200).json({url: imageURL});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Failed to retrieve form data entry'});
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const postEntries = await userPost.find();

    // Extract the image URLs for each post
    const postsWithURLs = postEntries.map(post => ({
      ...post._doc,
      url: `http://localhost:8080/uploads/images/${post.image}`,
    }));

    res.status(200).json(postsWithURLs);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Failed to retrieve post data'});
  }
};

exports.updatePost = async (req, res) => {
  const postId = req.params.postId;
  const userId = req.userId;

  const posts = await userPost.findById(postId);
  const response = await user.findById(userId); // you will only get notification to your own post
  let data = posts?.likes;
  // console.log(response, 'liked by user');
  // console.log(posts)

  // console.log(posts);
  if (posts) {
    if (!Array.isArray(posts.likes)) {
      res.status(404).json({message: 'Post not found'});
    } else {
      if (data.includes(userId)) data = data.filter(e => e != userId);
      else {
        data.push(userId);
        notificationController.registerNotification({
          fcmToken: response?.fcmToken,// notification will be send to this user
          likedPost: posts, // post that is liked
          likedbyUser:response // post is liked by
        });
      }
      await userPost.findByIdAndUpdate({_id: postId}, {$set: {likes: data}});
      res
        .status(200)
        .json({message: 'Likes updated successfully', likes: data});
    }
  } else {
    res.status(400).json({message: 'Invalid input'});
  }
};
