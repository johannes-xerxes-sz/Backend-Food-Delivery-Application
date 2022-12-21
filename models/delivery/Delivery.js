const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const MapboxClient = require('mapbox');


const DeliverySchema = new Schema({  
    cart: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Cart'
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Restaurant'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    currentAddress: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    }
}, {
    timestamps: true
})

DeliverySchema.pre('save', async function (next) {
        // for the latitude and longitude
        const privateKey = process.env.LOCATION_API_KEY;
        const client = new MapboxClient(privateKey);
        const geocodePromise = new Promise((resolve, reject) => {
            client.geocodeForward(this.currentAddress, async (err, data) => {
                if (err) {
                    reject(err);
                }
                this.latitude = data.features[0].geometry.coordinates[1];
                this.longitude = data.features[0].geometry.coordinates[0];
        
                resolve();
            });
        });
        
        geocodePromise.then(() => {
        this.longitude = this.longitude
        this.latitude = this.latitude
        next();
        });
        return geocodePromise;
    
   
})

module.exports = mongoose.model('Delivery', DeliverySchema);