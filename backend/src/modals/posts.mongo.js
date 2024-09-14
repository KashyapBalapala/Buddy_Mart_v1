const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

module.exports = mongoose.model('Post', postSchema);