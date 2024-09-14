const express = require('express');
const { httpCreateNewPost, httpGetAllPosts, httpGetUserPosts } = require('./posts.controller');

const postsRouter = express.Router();

postsRouter.post('/', httpCreateNewPost);
postsRouter.get('/all', httpGetAllPosts);
postsRouter.get('/:userId', httpGetUserPosts);


module.exports = postsRouter;