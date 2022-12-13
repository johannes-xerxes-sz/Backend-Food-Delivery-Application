const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const RestaurantSchema = new Schema({
    name: {  
        type: String,
        required: true,
        maxLength: 10
    },
    cuisine: { 
        type: String,
        required: true,
        maxLength: 10
    },    
    priceRange: { 
        type: String
    },
    ratings: [RatingSchema]

}, {
    timestamps: true
})

module.exports = mongoose.model('Restaurant', RestaurantSchema);