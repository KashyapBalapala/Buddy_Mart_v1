const friendRequests = require('./friendRequests.mongo');


async function existingRequest(senderId, receiverId) {
    return await friendRequests.findOne({ senderId, receiverId });
}

async function createFriendRequest(friendRequest) {
    await friendRequests.create(friendRequest);
    return friendRequest;
}

async function updateFriendRequest(friendRequest) {
    await friendRequests.findOneAndUpdate({
        _id: friendRequest._id,
      }, friendRequest, {
        upsert: true,
    }); 
}

function findRequest(id) {
    return friendRequests.findById(id);
}

async function getPendingRequests(userId) {
    const pendingRequests = await friendRequests.find({
        reciverId: userId,
        status: 'pending'
    });
    return pendingRequests;
}


module.exports = {
    existingRequest,
    createFriendRequest,
    findRequest,
    updateFriendRequest,
    getPendingRequests
}