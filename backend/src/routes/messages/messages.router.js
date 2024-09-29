const express = require('express');
const { httpSendMessage, httpGetDirectConversations, httpGetGroupConversations, httpGetRecentUsers } = require('./messages.controller');


const messagesRouter = express.Router();

messagesRouter.post('/send', httpSendMessage);
messagesRouter.get('/direct/:userId/:receiverId', httpGetDirectConversations);
messagesRouter.get('/group/:groupId', httpGetGroupConversations);
messagesRouter.get('/recent/:userId', httpGetRecentUsers);
messagesRouter.get('/createGroup', )


module.exports = messagesRouter;