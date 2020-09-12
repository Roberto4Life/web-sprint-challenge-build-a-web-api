const express = require('express');

const projectsRouter = require('./projects/projectsRouter.js');
const actionsRouter = require('./actions/actionsRouter.js');
const helmet = require('helmet');
const server = express();

server.use(methodLogger);
server.use(express.json());
server.use(helmet());
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Welcome</h2>`);
});

function methodLogger(req, res, next) {
  console.log(`${req.method} Request`);
  next();
}

module.exports = server;