const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mw = require('./middleware/middleware.js');

const usersRouter = require('./users/users-router.js');
const postsRouter = require('./posts/posts-router.js');

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(helmet());
server.use(express.json());
server.use(morgan("dev"));

// global middlewares and routes need to be connected here
server.use('/api/users', usersRouter);
server.use('/api/posts', postsRouter);

server.get('/', mw.logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
