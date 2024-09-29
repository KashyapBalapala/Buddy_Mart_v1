const messages = require('./messages.mongo');
const groups = require('./groups.mongo');
const users = require('./users.mongo');


async function sendMessage(message) {
    try {
        await messages.create(message);
    } catch(error) {
        console.log('Message not sent: ', error);
    }
}

async function getDirectConversations(userId, receiverId) {
    try {
        const newMessages = await messages.find({
            $or: [
                { sender: userId, receiver: receiverId },
                { sender: receiverId, receiver: userId }
            ]
        }).sort({ timestamp: 1 })
        .populate('sender')
        .populate('receiver');
        return newMessages;
    } catch(error) {
        console.log(`Messages Not found: `, error);
    }
}

async function getGroupConversations(groupId) {
    const newMessages = await messages.find({ groupId: groupId }).populate('sender');
    return newMessages;
}

async function getRecentUsers(userId) {
    try {
        const allMessages = await messages.find({
            $or: [
                { sender: userId },
                { receiver: userId },
                { groupId: { $exists: true }, 'content.text': { $exists: true } } // for group messages
            ]
        }).sort({ timestamp: -1 });

        const recentMessagesMap = new Map();
        allMessages.forEach(message => {
            const counterpart = message.groupId 
                ? message.groupId // For group chats, use the group ID as counterpart
                : (message.sender.equals(userId) ? message.receiver : message.sender);

            if (!recentMessagesMap.has(counterpart)) {
                recentMessagesMap.set(counterpart, message);
            }
        });

        const recentMessages = Array.from(recentMessagesMap.values());

        const counterpartIds = recentMessages.map(msg =>
            msg.groupId || (msg.sender.equals(userId) ? msg.receiver : msg.sender)
        );

        const userAndGroupDetails = await getDetails(counterpartIds);

        const result = recentMessages.map(message => {
            const counterpart = message.groupId 
                ? message.groupId
                : (message.sender.equals(userId) ? message.receiver : message.sender);
            
            const detail = userAndGroupDetails.find(detail => detail._id.equals(counterpart));
            return {
                user: detail.groupName 
                    ? { _id: detail._id, groupName: detail.groupName, members: detail.members }
                    : { _id: detail._id, userName: detail.userName, profilePic: detail.profilePic },
                lastMessageTimestamp: message.timestamp
            };
        });

        return result;
    } catch (error) {
        console.error('Error fetching recent users:', error);
        throw error;
    }
}

// Optimized function to fetch user and group details in bulk
async function getDetails(ids) {
    const usersList = await users.find({ _id: { $in: ids }, groupName: { $exists: false } }); // Fetch users
    const groupsList = await groups.find({ _id: { $in: ids } }); // Fetch groups
    return [...usersList, ...groupsList];
}


async function createGroup(group) {
    try {
        await groups.create(group);
    } catch(error) {
        console.log('Message not sent: ', error);
    }
}
module.exports = {
    sendMessage,
    getDirectConversations,
    getGroupConversations,
    getRecentUsers,
    createGroup
}