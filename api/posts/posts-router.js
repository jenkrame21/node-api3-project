const express = require('express');

const Posts = require('./posts-model.js');
const mw = require('../middleware/middleware.js');

const router = express.Router();

// 1 - GET - RETURN AN ARRAY WITH ALL THE POSTS
router.get('/', (req, res) => {
  Posts.get()
    .then((posts) => {
      // Working!
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving post data'
      });
    });
});

// 2 - GET - RETURN THE POST OBJECT
router.get('/:id', mw.validatePostId, (req, res) => {
  // Working!
  res.status(200).json(req.posts);
});

module.exports = router;
