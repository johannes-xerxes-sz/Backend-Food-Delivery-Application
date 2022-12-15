const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const FoodSchema = new Schema ({
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
    },
    ingredients: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu.Ingredients' // get ingredients within an object
    },
    quantity: [QuantitySchema],
    description: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

const QuantitySchema = new Schema ({
    toAdd: {
        type: String,
    },
    toRemove: {
        type: String,
    }

}, {
    timestamps: true
})

const CartSchema = new Schema({
    cartNumber: {
        type: String,
        required: true
    },
    totalPrice: {  // plus distance cost
        type: Number,
        required: true
    },
    // totalQuantity: {   
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: Object.keys(FoodSchema).length,
    //     type: Number,
    //     required: true
    // }, 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    modePayment: {
        type: String,
        required: true, 
        enum: [
            'cash',
            'card'
        ]
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    foods: [FoodSchema],
    driver: [DeliverySchema]
}, {
    timestamps: true
})

const DeliverySchema = new Schema ({
    driverName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
    driver: {
        type: String,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('Cart', CartSchema);