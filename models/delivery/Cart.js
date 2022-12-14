const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const FoodSchema = new Schema ({
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menu'
    },
    ingredients: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menu.ingredients' // get ingredients within an object
    },
    quantity: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

const CartSchema = new Schema({
    orderNumber: {
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
    foods: [FoodSchema]
}, {
    timestamps: true
})

module.exports = mongoose.model('Cart', CartSchema);