const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    bucketId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Bucket',
        default: null
    },
    friends: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    posts: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post' 
    }],
    profilePic: {
        type: String,
    }
});


module.exports = mongoose.model('User', userSchema);