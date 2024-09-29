const { sendMessage, getDirectConversations, getRecentUsers, createGroup } = require("../../modals/messages.model");


async function httpSendMessage(req, res) {
    try {
        const { sender, receiver, groupId, content, product } = req.body;
        let message;
        if (groupId) {
            if (!product) {
                message = { sender, groupId, content };
            } else {
                message = { sender, groupId, content, product };
            }
        } else if (receiver) {
            if (!product) {
                 message = { sender, receiver, content };
            } else {
                 message = { sender, receiver, content, product };
            }
        } else {
            return res.status(400).json({ error: 'Need reciver or group details'});
        }
       
        await sendMessage(message);
        return res.status(201).json(message);
    } catch(error) {
        return res.status(500).json(error);
    }
}

async function httpGetRecentUsers(req, res) {
    const { userId } = req.params;
    console.log('Hello')
    try {
        const messages = await getRecentUsers(userId);
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).send(error); 
    }
}

async function httpGetDirectConversations(req, res) {
    const { userId, receiverId } = req.params;
    try {
        const messages = await getDirectConversations(userId, receiverId);
        return res.status(200).json(messages);
    }  catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function httpGetGroupConversations(req, res) {
    const { groupId } = req.params;
    try {
        const messages = await getGroupConversations(groupId);
        return res.status(200).json(messages);
    }  catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


async function httpCreateGroup(req, res) {
    const { members, groupName } = req.params;
    try {
        const group = {
            members,
            groupName
        };
        await createGroup(group);
    } catch(error) {
        return res.status(500).json({error: 'Unable to create a group'});
    }
}

module.exports = {
    httpSendMessage,
    httpGetDirectConversations,
    httpGetGroupConversations,
    httpGetRecentUsers,
    httpCreateGroup
}