const Users = require('../users/users-model.js');

// Global middleware
function logger(req, res, next) {
  console.log(req.method, req.url, new Date().toUTCString());
  next();
}

// USER MIDDLEWARES
const validateUserId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.getById(id);
    if (!user) {
      // Working!
      res.status(400).json({ message: `No user with ID: ${id}` });
    } else {
      req.user = user;
      next();
    }
  } catch(e) {
    res.status(500).json(`Server error: ${e}`);
  }
}
// -- GET above returns a "name", assuming that's the required
const validateUser = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    // Working!
    res.status(400).json({
      message: "Name is required"
    });
  } else {
    next();
  }
}

// POST MIDDLEWARE
function validatePost(req, res, next) {
  // do your magic!
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}