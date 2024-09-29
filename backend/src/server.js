const http = require('https');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const fs = require('fs');
const express = require('express');


const app = require('./app');

// const server = http.createServer(app);
const server = http.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app);
const io = socketio(server);

const MONGO_URL = 'mongodb+srv://kbalapala:edsaGZ1G6RQm7UPF@buddycluster.qbi07.mongodb.net/?retryWrites=true&w=majority&appName=BuddyCluster';

mongoose.connection.once('open', () => {
    console.log("Mongo DB connection ready");
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});


async function startServer() {
    await mongoose.connect(MONGO_URL);
    server.listen(8000, () => {
        console.log('this is a node js server listening at 8000');
    });
}

startServer();


const chatRouter = require('./routes/chats/chats.router')(io);
app.use('/chat', chatRouter);