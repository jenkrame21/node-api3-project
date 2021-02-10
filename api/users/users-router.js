const express = require('express');

const Users = require('./users-model.js');
const mw = require('../middleware/middleware.js');

const router = express.Router();

// 1 - GET - RETURN AN ARRAY WITH ALL THE USERS
router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      // Working!
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving user data'
      });
    });
});

// 2 - GET - RETURN THE USER OBJECT BY ID
router.get('/:id', mw.validateUserId, (req, res) => {
  // Working!
  res.status(200).json(req.user);
});

// 3 - POST - RETURN THE NEWLY CREATED USER OBJECT
router.post('/', mw.validateUser, (req, res) => {
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then(user => {
      // Working!
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving user data' 
      });
    });
});

// RETURN THE FRESHLY UPDATED USER OBJECT
router.put('/:id', mw.validateUserId, mw.validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving user data'
      });
    });
});

// router.delete('/:id', (req, res) => {
//   // RETURN THE FRESHLY DELETED USER OBJECT
//   // this needs a middleware to verify user id
// });

// router.get('/:id/posts', (req, res) => {
//   // RETURN THE ARRAY OF USER POSTS
//   // this needs a middleware to verify user id
// });

// router.post('/:id/posts', (req, res) => {
//   // RETURN THE NEWLY CREATED USER POST
//   // this needs a middleware to verify user id
//   // and another middleware to check that the request body is valid
// });

module.exports = router;
