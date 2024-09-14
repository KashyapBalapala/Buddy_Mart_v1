const { existingRequest, createFriendRequest, findRequest, updateFriendRequest, getPendingRequests } = require("../../modals/friendRequests.model");
const { addFriendRequest, getUser } = require("../../modals/users.model");


async function sendFriendRequest(req, res) {
    const { senderId, receiverId } = req.body;

    if (await existingRequest(senderId, receiverId)) {
        return res.status(400).json({ message: 'Friend request already sent' });
    }

    const friendRequest = {
        senderId,
        receiverId,
        status: 'pending',
    };
    const result = await createFriendRequest(friendRequest);
    if (result) {
        return res.status(200).json({ message: 'Friend request sent', friendRequest: result });
    } else {
        return res.status(400).json({error: 'error'});
    }
}

async function respondToFriendRequest(req, res) {
    const { requestId, response } = req.body;

    const friendRequest = await findRequest(requestId);
    if (response === 'accepted') {
        await addFriendRequest(friendRequest.senderId, friendRequest.receiverId);
    }
    friendRequest.status = response;
    await updateFriendRequest(friendRequest);
    res.status(200).json({ message: `Friend request ${response}` });
}

async function httpGetPendingRequests(req, res) {
    const { userId } = req.params;
    const pendingRequests = await getPendingRequests(userId);
    res.status(200).json(pendingRequests);
}

async function httpGetFriends(req, res) {
    const { userId } = req.params;
    const user = await getUser(userId);
    res.status(200).json(user.friends);
}


module.exports = {
    sendFriendRequest,
    respondToFriendRequest,
    httpGetPendingRequests,
    httpGetFriends
}