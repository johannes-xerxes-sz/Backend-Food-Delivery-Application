// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const validator = require('validator');



// const QuantitySchema = new Schema ({
//     toAdd: {
//         type: String,
//     },
//     toRemove: {
//         type: String,
//     }

// }, {
//     timestamps: true
// })

// const DeliverySchema = new Schema({
//     cartNumber: {
//         type: String,
//         required: true
//     },
//     totalPrice: {  // plus distance cost
//         type: Number,
//         required: true
//     },
//     // totalQuantity: {   
//     //     type: mongoose.Schema.Types.ObjectId,
//     //     ref: Object.keys(FoodSchema).length,
//     //     type: Number,
//     //     required: true
//     // }, 
//     author: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     modePayment: {
//         type: String,
//         required: true, 
//         enum: [
//             'cash',
//             'card'
//         ]
//     },
//     confirmed: {
//         type: Boolean,
//         default: false
//     },
//     foods: [FoodSchema]
// }, {
//     timestamps: true
// })

// module.exports = mongoose.model('Delivery', DeliverySchema);