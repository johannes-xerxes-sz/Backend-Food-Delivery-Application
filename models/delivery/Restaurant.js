const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MapboxClient = require('mapbox');

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
    },
    cuisine: { 
        type: String,
        required: true,
    },    
    priceRange: { 
        type: String,
        enum: [
            'Low',
            'Middle',
            'High'
        ]
    },
    address: {
        type: String,
        required: true
    },    
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    ratings: [RatingSchema],
    customer: [{type: Schema.Types.ObjectId, ref: 'Cart'}]
}, {
    timestamps: true
})

RestaurantSchema.pre('save', async function (next) {

    
    const privateKey = process.env.LOCATION_API_KEY;
    const client = new MapboxClient(privateKey);
    const geocodePromise = new Promise((resolve, reject) => {
        client.geocodeForward(this.address, async (err, data) => {
            if (err) {
                reject(err);
            }
            this.latitude = data.features[0].geometry.coordinates[1];
            this.longitude = data.features[0].geometry.coordinates[0];
            console.log(this.latitude)
    
            resolve();
        });
    });
    
    geocodePromise.then(() => {
    this.longitude = this.longitude
    this.latitude = this.latitude
    console.log(this.latitude)
    });
    return geocodePromise;
})


module.exports = mongoose.model('Restaurant', RestaurantSchema);