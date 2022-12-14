const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const RatingSchema = new Schema ({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const CartSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxLength: 20
    },
    price: { 
        type: Number
    },
    ratings: [RatingSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Cart', CartSchema);