const express = require('express');
const helmet = require('helmet');
const authRouter = require('./api/authRouter.js');


const server = express();


server.use(express.json());
server.use(helmet());
server.use('/api/auth', authRouter);




module.exports = server;