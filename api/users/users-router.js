const express = require('express');

const Users = require('./users-model.js');
const mw = require('../middleware/middleware.js');

const router = express.Router();

// 1 - GET - RETURN AN ARRAY WITH ALL THE USERS
router.get('/', (req, res, next) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch((error) => {
      next(error);
    });
});

// 2 - GET - RETURN THE USER OBJECT BY ID
router.get('/:id', mw.validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

// 3 - POST - RETURN THE NEWLY CREATED USER OBJECT
router.post('/', mw.validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

// 4 - PUT - RETURN THE FRESHLY UPDATED USER OBJECT
router.put('/:id', mw.validateUserId, mw.validateUser, (req, res, next) => {
  Users.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      next(error);
    });
});

// 5 - DELETE - RETURN THE FRESHLY DELETED USER OBJECT
router.delete('/:id', mw.validateUserId, (req, res, next) => {
  Users.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: "User has been terminated"
      })
    })
    .catch((error) => {
      next(error);
    });
});

// 6 - GET - RETURN THE ARRAY OF USER POSTS
router.get('/:id/posts', mw.validateUserId, (req, res, next) => {
  const userId = req.params.id;
  Users.getUserPosts(userId)
  .then((posts) => {
    res.status(200).json(posts);
  })
  .catch((error) => {
    next(error);
  })
});

// 7 - POST - RETURN THE NEWLY CREATED USER POST
router.post('/:id/posts', mw.validateUserId, mw.validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((error) => {
      next(error);
    });
});

// USER Server Error Middleware
router.use((err, req, res) => {
  res.status(500).json({
    message: "Error retrieving user data",
    error: err.message
  });
});

module.exports = router;
