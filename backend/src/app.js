const express = require('express');
const path = require('path');

const cors = require('cors');
const morgan = require('morgan');
const productsRouter = require('./routes/products/products.router');
const usersRouter = require('./routes/users/users.router');
const friendRequestRouter = require('./routes/friendRequests/friendRequests.router');
const postsRouter = require('./routes/posts/posts.router');
const bucketsRouter = require('./routes/buckets/buckets.router');
const messagesRouter = require('./routes/messages/messages.router');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(morgan('combined'));

// app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

app.use('/', productsRouter);
app.use('/users', usersRouter);
app.use('/friend', friendRequestRouter);
app.use('/posts', postsRouter);
app.use('/bucket', bucketsRouter);
app.use('/messages', messagesRouter);

// app.use(planetsRouter);

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

module.exports = app;