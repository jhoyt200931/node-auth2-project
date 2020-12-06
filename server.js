const express = require('express');
const helmet = require('helmet');
const authRouter = require('./api/authRouter.js');
const usersRouter = require('./api/usersRouter.js');

const server = express();


server.use(express.json());
server.use(helmet());
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);




module.exports = server;