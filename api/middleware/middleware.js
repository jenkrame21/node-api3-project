// Global middleware
function logger(req, res, next) {
  console.log(req.method, req.url, new Date().toUTCString());
}

// User middlewares
function validateUserId(req, res, next) {
  // do your magic!

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