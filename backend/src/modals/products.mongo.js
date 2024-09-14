const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    reviews: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }]
});

module.exports = mongoose.model('Product', productSchema);