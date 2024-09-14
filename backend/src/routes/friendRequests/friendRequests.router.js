const express = require('express');
const { sendFriendRequest, respondToFriendRequest, httpGetPendingRequests, httpGetFriends } = require('./friendRequests.controller');


const friendRequestRouter = express.Router();

friendRequestRouter.post('/sendFriendRequest', sendFriendRequest);
friendRequestRouter.post('/respondFriendRequest', respondToFriendRequest);
friendRequestRouter.get('/pendingRequests/:userId', httpGetPendingRequests);
friendRequestRouter.get('/friends/:userId', httpGetFriends)


module.exports = friendRequestRouter;