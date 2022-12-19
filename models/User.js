const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const MapboxClient = require('mapbox');


const UserSchema = new Schema({
    userName: {  
        type: String,
        unique: true,
        required: true,
        maxLength: 10
    }, 
    gender: {
        type: String,
        required: true,
        enum: [
            'Male',
            'Female'
        ]
    },
    age: { 
        type: Number,
        required: true,
        validate: (age) => {
            return typeof age === 'number';
        }
    },    
    email: {
        type: String,
        required: true,
        validate: (email) => {
            return validator.isEmail(email);
        }
    },
    password: {
        type: String,
        required: true,
        validate: (password) => {
            return validator.isStrongPassword(password);
        }
    },
    firstName: {
        type: String,
        required: true,
        maxLength: 10
    }, 
    lastName: {
        type: String,
        required: true,
        maxLength: 10
    }, 
    address: {
        type: String,
        required: true,
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    },
    admin: {
        type: Boolean,
        default: false
    },
    owner: {
        type: Boolean,
        default: false
    },
    driver: {
        type: Boolean,
        default: false
    }



}, {
    timestamps: true
}
);
UserSchema.pre('save',  function (next) {
    this.userName = this.userName.trim();
    this.firstName = this.firstName.trim();
    this.lastName = this.lastName.trim();
    next();
   
})

UserSchema.pre('save', async function (next) {
/*     this.userName = this.userName.trim();
this.firstName = this.firstName.trim();
this.lastName = this.lastName.trim();
*/

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
console.log(this.latitude) // undefined

if (!this.isModified('password')) next();

const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.getSignedJwtToken = function() { 
return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
})
}

UserSchema.methods.matchPassword = async function(enteredPassword) {
return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.methods.getResetPasswordToken = function () {
const resetToken = crypto.randomBytes(20).toString('hex')
this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
return resetToken;
}

UserSchema.post('save', function ()  {
this.gender = this.gender.toUpperCase();

}) 

module.exports = mongoose.model('User', UserSchema);