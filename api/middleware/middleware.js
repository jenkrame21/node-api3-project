const Users = require('../users/users-model.js');

// Global middleware
function logger(req, res, next) {
  console.log(req);
  console.log(req.method, req.url, new Date().toUTCString());
  next();
}

// User middlewares
const validateUserId = async (req, res, next) => {
  // do your magic!
  const { id } = req.params;
  try {
    const user = await Users.getById(id);
    if (!user) {
      res.status(400).json({ message: `No user with id: ${id}` });
    } else {
      req.user = user;
      next();
    }
  } catch(e) {
    res.status(500).json(`Server error: ${e}`);
  }
}

function validateUser(req, res, next) {
  // do your magic!
}

// Post middleware
function validatePost(req, res, next) {
  // do your magic!
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}