const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const PaymentSchema = new Schema({
    amount: {  
        type: Number,
        required: true
    },
    currency: {  
        type: String,
        required: true
    },     
    source: {  
        type: String,
        required: true
    },     
    description: {  
        type: String,
        required: true
    }


}, {
    timestamps: true
}
);


module.exports = mongoose.model('Payment', PaymentSchema);