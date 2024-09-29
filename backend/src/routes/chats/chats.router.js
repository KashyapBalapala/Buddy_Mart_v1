const express = require("express");
const { generateMessage, generateLocationMessage } = require("../../utils/messages");
const { addUser, removeUser, getUser, getUsersInRoom } = require("../../utils/users");
const path = require('path')

const chatRouter = express.Router();

const chatSocket = (io) => {
    io.on("connection", socket => {
        console.log("New WebSocket connection");

        socket.on("join", (options, callback) => {
            const { error, user } = addUser({ id: socket.id, ...options });
            if (error) {
                return callback(error);
            }
            socket.join(user.room);
            socket.emit("message", generateMessage("Admin", "Welcome!"));
            socket.broadcast.to(user.room).emit("message", generateMessage("Admin", `${user.username} has joined!`));
            io.to(user.room).emit("roomData", {
                room: user.room,
                users: getUsersInRoom(user.room)
            });
            callback();
        });

        socket.on("sendMessage", (message, callback) => {
            const user = getUser(socket.id);
            if (!message) {
                return callback("Message cannot be empty!");
            }
            io.to(user.room).emit("message", generateMessage(user.username, message));
            callback();
        });

        socket.on("sendLocation", (coords, callback) => {
            const user = getUser(socket.id);
            io.to(user.room).emit("locationMessage", generateLocationMessage(user.username, `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`));
            callback();
        });

        socket.on("disconnect", () => {
            const user = removeUser(socket.id);
            if (user) {
                io.to(user.room).emit("message", generateMessage("Admin", `${user.username} has left!`));
                io.to(user.room).emit("roomData", {
                    room: user.room,
                    users: getUsersInRoom(user.room)
                });
            }
        });
    });
};

const publicDirectoryPath = path.join(__dirname, '..', '..', '..', 'public');

chatRouter.use(express.static(publicDirectoryPath));

// chatRouter.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', '..', '..', 'public', 'index.html'));
// });

// Export the router function
module.exports = (io) => {
    chatSocket(io);
    return chatRouter;
};
