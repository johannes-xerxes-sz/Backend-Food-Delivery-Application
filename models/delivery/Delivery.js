const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');


const DeliverySchema = new Schema({  
    cart: [{
        type: Schema.Types.ObjectId, 
        ref: 'Cart'
    }],
    restaurant: [{
        type: Schema.Types.ObjectId, 
        ref: 'Restaurant'
    }],
    user: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
    isDelivered: {
        type: Boolean,
        default: false
    },
    currentAddress: {
        type: String
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    }
}, {
    timestamps: true
})

DeliverySchema.pre('save',  function (next) {
    
   
})

module.exports = mongoose.model('Delivery', DeliverySchema);