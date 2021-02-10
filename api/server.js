const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(helmet());
server.use(express.json());
server.use(morgan("dev"));

// global middlewares and routes need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
