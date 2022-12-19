const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const MapboxClient = require('mapbox');

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

const FoodSchema = new Schema ({
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
    },
    ingredients: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu' // make an endpoint to retrieve a subschema from the backend then parse into getting that ingredients
    },
    quantity: [QuantitySchema],
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
})



const CartSchema = new Schema({
    address: {
        type: String,
        required: true
    },    
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    totalPrice: {  // plus distance cost
        type: Number,
    },
    totalQuantity: {   
        type: Number,
    }, 
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    card: {
        type: Boolean,
        default: false
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    foods: [FoodSchema],
    restaurant: [{
        type: Schema.Types.ObjectId, 
        ref: 'Restaurant'
    }]

}, {
    timestamps: true
})

/* CartSchema.pre('save', async function (next) {

    // for the latitude and longitude
    const privateKey = process.env.LOCATION_API_KEY;
    const client = new MapboxClient(privateKey);
    const geocodePromise = new Promise((resolve, reject) => {
        client.geocodeForward(this.address, async (err, data) => {
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


}) */

CartSchema.pre('save', async function (next) {
    const cart = this;
    const privateKey = process.env.LOCATION_API_KEY;
    const client = new MapboxClient(privateKey);
  
    client.geocodeForward(this.address, async (err, data) => {
      if (err) {
        return next(err);
      }
      this.latitude = data.features[0].geometry.coordinates[1];
      this.longitude = data.features[0].geometry.coordinates[0];
  
      function haversineDistance(lat1, lon1, lat2, lon2) {
        // Haversine formula implementation goes here (see previous answer for example)
      }
  
      // Calculate distance between the restaurant's latitude and longitude and the user's latitude and longitude
      const distance = haversineDistance(cart.restaurant.latitude, cart.restaurant.longitude, this.latitude, this.longitude);
  
      // Convert distance from meters to kilometers
      const distanceInKm = distance / 1000;
  
      // Calculate charge based on distanceInKm
      const totalDistanceCharge = distanceInKm * 0.50; // charge $0.50 per kilometer
  
      // Save the totalDistanceCharge to the totalDistanceCharge field of the cart object
      cart.totalDistanceCharge = totalDistanceCharge;
  
      next();
    });
  });
  

module.exports = mongoose.model('Cart', CartSchema);