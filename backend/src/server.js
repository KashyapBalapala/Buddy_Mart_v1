const http = require('http');
const mongoose = require('mongoose');
const socketio = require('socket.io');


const app = require('./app');

const server = http.createServer(app);
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
    server.listen(5000, () => {
        console.log('this is a node js server');
    });
}

startServer();