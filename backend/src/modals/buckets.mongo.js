const mongoose = require('mongoose');

const bucketSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product' 
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    isShared: {
        type: Boolean,
        default: false,
        required: true
    }
});

module.exports = mongoose.model('Bucket', bucketSchema);