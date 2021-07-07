const Users = require('../users/users-model.js');
const Posts = require('../posts/posts-model.js');

// --------- Global middleware --------- //
function logger(req, res, next) {
  console.log(req.method, req.url, new Date().toUTCString());
  next();
}

// --------- USER MIDDLEWARES --------- //
// Validating User with User ID
const validateUserId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.getById(id);
    if (!user) {
      res.status(400).json({ 
        message: `No user with ID: ${id}` 
      });
    } else {
      req.user = user;
      next();
    }
  } catch(error) {
    res.status(500).json({
      message: `Server error: ${error}`
    });
  }
}

// Validating User with required field: name
const validateUser = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      message: "Name is required"
    });
  } else {
    next();
  }
}

// --------- POST MIDDLEWARES --------- //
// Validating Post with Post ID
const validatePostId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Posts.getById(id);
    if (!post) {
      res.status(400).json({
        message: `ID: ${id} does not exist`
      });
    } else {
      req.post = post;
      next();
    }
  } catch(error) {
    res.status(500.).json({
      message: `Server error: ${error}`
    });
  }
}

// Validating Post with required fields: text, user_id
function validatePost(req, res, next) {
  const { text, user_id } = req.body;
  if (!req.body) {
    res.status(400).json({
      message: "Missing post data"
    });
  } else if (!text || !user_id) {
    res.status(400).json({
      message: "Text and user_id is required"
    });
  } else {
    next();
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
  validatePostId
}