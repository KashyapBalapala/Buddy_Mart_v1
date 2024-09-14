const express = require('express');
const { httpGetAllUsers, httpAllUsers, httpCreateNewUser } = require('./users.controller');

const usersRouter = express.Router();

usersRouter.post('/create', httpCreateNewUser)
usersRouter.get('/', httpGetAllUsers);
usersRouter.get('/all', httpAllUsers);

module.exports = usersRouter;