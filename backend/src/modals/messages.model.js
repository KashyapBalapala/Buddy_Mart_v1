const messages = require('./messages.mongo');
const groups = require('./groups.mongo');
const mongoose = require('mongoose');


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
                { sender: req.params.userId, receiver: req.params.receiverId },
                { sender: req.params.receiverId, receiver: req.params.userId }
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
    const newMessages = await messages.find({ groupId: req.params.groupId }).populate('sender');
    return newMessages;
}

async function getRecentUsers(userId) {
    try {
        // const recentMessages = await messages.aggregate([
        //     // Stage 1: Match messages where sender or receiver is the userId
        //     {
        //         $match: {
        //             $or: [
        //                 { sender: userId },
        //                 { receiver: userId }
        //             ]
        //         }
        //     },
        //     // Stage 2: Sort by timestamp
        //     {
        //         $sort: { timestamp: -1 }
        //     },
        //     // Debugging stage: Check results after sorting
        //     {
        //         $project: {
        //             sender: 1,
        //             receiver: 1,
        //             timestamp: 1
        //         }
        //     },
        //     // Stage 3: Group by user to find latest messages
        //     {
        //         $group: {
        //             _id: {
        //                 $cond: [
        //                     { $eq: ['$sender', userId] },
        //                     '$receiver',
        //                     '$sender'
        //                 ]
        //             },
        //             lastMessageTimestamp: { $first: '$timestamp' }
        //         }
        //     },
        //     // Debugging stage: Check results after grouping
        //     {
        //         $project: {
        //             _id: 1,
        //             lastMessageTimestamp: 1
        //         }
        //     },
        //     // Stage 4: Lookup user details
        //     {
        //         $lookup: {
        //             from: 'users',
        //             localField: '_id',
        //             foreignField: '_id',
        //             as: 'user'
        //         }
        //     },
        //     // Debugging stage: Check results after lookup
        //     {
        //         $unwind: '$user'
        //     },
        //     {
        //         $project: {
        //             'user._id': 1,
        //             'user.userName': 1,
        //             'user.profilePic': 1,
        //             lastMessageTimestamp: 1
        //         }
        //     }
        // ]);

        // const testMessages = await messages.find({
        //     $or: [
        //         { sender: userId },
        //         { receiver: userId }
        //     ]
        // });
        // console.log(testMessages);
        // return recentMessages;
        const allMessages = await messages.find({
            $or: [
                { sender: userId },
                { receiver: userId }
            ]
        }).sort({ timestamp: -1 }).toArray();
        
        // In-memory processing
        const recentMessagesMap = new Map();
        
        allMessages.forEach(message => {
            // Identify the counterpart user (the other user involved in the conversation)
            const counterpart = message.sender.equals(userId) ? message.receiver : message.sender;
        
            // If we haven't already recorded the most recent message for this counterpart, add it
            if (!recentMessagesMap.has(counterpart)) {
                recentMessagesMap.set(counterpart, message);
            }
        });
        
        // Convert the map to an array of recent messages
        const recentMessages = Array.from(recentMessagesMap.values());
        
        // Optional: Now, look up user details for each counterpart
        const counterpartIds = recentMessages.map(msg => msg.sender.equals(userId) ? msg.receiver : msg.sender);
        const userDetails = await users.find({ _id: { $in: counterpartIds } }).toArray();
        
        // Merge user details with messages
        const result = recentMessages.map(message => {
            const counterpart = message.sender.equals(userId) ? message.receiver : message.sender;
            const userDetail = userDetails.find(user => user._id.equals(counterpart));
        
            return {
                user: {
                    _id: userDetail._id,
                    userName: userDetail.userName,
                    profilePic: userDetail.profilePic
                },
                lastMessageTimestamp: message.timestamp
            };
        });
        
        return result;
        
    } catch (error) {
        console.error('Error fetching recent users:', error);
        throw error;
    }
}
module.exports = {
    sendMessage,
    getDirectConversations,
    getGroupConversations,
    getRecentUsers
}