const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const RatingSchema = new Schema ({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
        validate: (age) => {
            return typeof age === 'number';
        }
    },
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
    restaurant: {
        type: String,
        required: true
    },    
    type: {
        type: String,
        required: true, 
        enum: [
            'appetizer',
            'salad',
            'main',
            'dessert'
        ]
    },
    price: { 
        type: Number
    },
    ratings: [RatingSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Cart', CartSchema);