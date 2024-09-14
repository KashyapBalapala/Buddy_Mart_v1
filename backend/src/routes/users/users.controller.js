const { getAllUsers, allUsers, createNewUser } = require('../../modals/users.model');

async function httpCreateNewUser(req, res) {
    const user = req.body;
    if (!user.userName || !user.email) {
        return res.status(400).json({
            error: 'Missing User Property'
        });
    }
    await createNewUser(user);
    return res.status(201).json(user);
}

async function httpGetAllUsers(req, res) {
    return res.status(200).json(await allUsers());
}

async function httpAllUsers(req, res) {
    return res.status(200).json(await allUsers());
}

module.exports = {
    httpCreateNewUser,
    httpGetAllUsers,
    httpAllUsers
}