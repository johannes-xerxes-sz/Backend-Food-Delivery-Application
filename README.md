# Food Delivery Backend Application  [![Building status: In progress](https://img.shields.io/badge/Building%20status:-In%20Progress-brightgreen.svg?style=flat)](https://github.com/johannes-xerxes-sz/backend-capstone-final/)

Food Delivery Backend Application 

## Table of contents
* [General info](#general-info)
* [Project Demo](#project-demo)
* [Project Postman Documentation](#project-postman-documentation)
* [Project Video](#project-video)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Inspiration](#inspiration)
* [Contact](#contact)
* [License](#license)

## General info
A backend application program with the listed features would likely be a web-based application that allows users to perform create, read, update, and delete (CRUD) operations on information related to food, restaurants, and menus. This could include creating and updating listings for different types of food, restaurants, and menus, as well as deleting outdated or inaccurate information.
The program may also include integration with the Stripe payment system, which would allow users to make payments through the application using various payment methods.
Finally, the program may include a live location feature that allows users to track their location in real-time, either through GPS or other location tracking technologies. This could be useful for a variety of purposes, such as tracking the location of delivery drivers or helping users find their way to a particular restaurant.

<div align="center">Welcome to Food Delivery Backend Application! </div>
<br/>
<div align="center">
<kbd>
<img src="./Capture.jpg">
</kbd>
</div>

<br/>
<div align="center">
<kbd>
<img src="./Screen Shot 2022-12-22 at 4.19.00 PM.png">
</kbd>
</div>

<br/>
<div align="center">
<kbd>
<img src="./Screen Shot 2022-12-22 at 4.18.55 PM.png">
</kbd>
</div>

<br/>
<div align="center">
<kbd>
<img src="./Screen Shot 2022-12-22 at 4.18.29 PM (2).png">
</kbd>
</div>

## Project Demo 
[Click to view demo video](https://youtube.com)

## Project Postman Documentation 
[Click to view documentation](https://youtube.com)

## Project Video
[Click to view demo of BugView](https://youtube.com)

## Technologies
### Backend Development 
* Node.js - version 14.6.0
* Express - version 4.17.1
* Express-Validator - version 6.6.1
* Config - version 3.3.2
* JWT - version 8.5.1
* bcryptjs - 2.4.3",
* cors - 2.8.5
* dotenv - 16.0.3
* ejs - 3.1.8
* express - 4.18.2
* helmet - 6.0.2
* hpp - 0.2.3
* mapbox-gl -2.11.1 
* mongodb - 4.12.1
* mongoose - 6.8.0
* morgan - 1.10.0
* stripe - 11.3.0
* validator - 13.7.0

## Setup
To try out this project: 
1. Clone the GitHub repository locally to your computer
1. In the command line, navigate to the root directory of the repository, and type the following: 
  $ npm install 
1. Navigate to the client folder, and in the root directory of the client folder, type the following: 
  $ npm install 
1. In the client folder, and in the root directory of the client folder, type the following: 
  $ npm start
1. Navigate back to the root directory of this project "/GitConnect" and start the server by typing the following: 
  $ npx nodemon server 

## Code Examples
### delivery/cartController.js
```javascript
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const cart = await Cart.findById(req.params.cartId);
    const payment = await stripe.charges.create(req.body);
     const {
      amount,
      currency,
      source,
      description
  }= payment
  cart.payment.push(req.body);

  let charge = await Payment.create({
      amount,
      currency,
      source: source.brand,
      description
  });
   charge = await cart.save();
```
### models/Cart.js
```javascript
CartSchema.pre('save', async function (next) {

    
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

}) 
```
```javascript
CartSchema.pre('save', async function(next) {
    let restaurant = await Restaurant.findById(this.restaurant)
    // const Cart = mongoose.model('Cart', CartSchema);
    // this.foods = await Cart.populate(this, 'foods.name', ['name', 'restaurant', 'type', 'price']);
    // this.foods = await Cart.populate(this, 'foods.name foods.price', ['name', 'price']);

    // console.log(this.foods)

    let totalPrice = 0
    for (let food of this.foods) {

        if (food.menu.price) {
            totalPrice = totalPrice + food.menu.price
        } else {
            const foodItem = await Menu.findById(food.menu)
            totalPrice = totalPrice + foodItem.price
        }
    }    
    console.log(totalPrice)
    let lon1 = this.longitude 
    let lat1 = this.latitude
    let lat2 = restaurant.latitude
    let lon2 = restaurant.longitude

    function deg2rad(deg) {
        return deg * (Math.PI/180)
      }

        const R = 3959; // Radius of the Earth in miles
        const dLat = deg2rad(lat2-lat1);  // deg2rad below
        const dLon = deg2rad(lon2-lon1); 
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        const d = R * c; // Distance in miles
        this.deliveryCost = Math.round((d * 1.2)* 100)/100; 
        return this.totalPrice = totalPrice + this.deliveryCost     
})
```

## Features
* Backend stack web application utilizing: MongoDB, Express.js, React, Stripe, mapbox, jwt, openweather, and Node.js. 


## Status
Project is: finished on the backend foundation minor optimazation and features on
* Weather status.
* Exporting render for a sample website.


add the major functions in the future:
* Meal planner.
* Local tracker.
* Community produce.
* Try to add a front end function

## Inspiration
I am on a journey to create a software program that will make a real impact in the world, and I am driven by my love of food. Whether I am cooking a delicious meal or building a software program, I am always striving to create something special. I know that building a software program is like building a puzzle, and it's up to me to bring all the pieces together. I stay focused, stay true to my vision, and never give up. I know that with hard work, dedication, and a little bit of inspiration, I can achieve anything I set my mind to, even if it's just cooking the perfect meal.

## Contact
Created by [Johannes Xerxes M. Dalogdog](https://www.linkedin.com/in/johannes-xerxes-dalogdog-878b331a7) 
Feel free to contact me for any questions! 

## License
[Click to view](https://github.com/johannes-xerxes-sz/backend-capstone-final/blob/master/LICENSE)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
