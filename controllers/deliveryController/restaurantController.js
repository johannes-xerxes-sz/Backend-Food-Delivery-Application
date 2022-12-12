const restaurant = require('../models/delivery/Restaurant');

const getRestaurants = async (req, res, next) => {

    const filter = {};
    const options = {};
    if(Object.keys(req.query).length){
        // query parameter
        const {
            name,
            cuisine,
            priceRange
        } = req.query

        if(name) filter.name = true
        if(cuisine) filter.cuisine = true
        if(priceRange) filter.priceRange = true

        if(limit) options.limit = limit
        if(sortByGenre) options.sort = {
            genre: sortByGenre === 'asc' ? 1: -1
        }
    }

    try {
        const restaurants = await restaurant.find({ }, filter, options)
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(restaurants)

    } catch (err) {
        throw new Error(`Error retrieving all restaurant: ${err.message}`)
    }
    
}

const postRestaurant = async (req, res, next) => {
    try {
        const restaurant= await restaurant.create(req.body);
        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(restaurant)
    }
    catch (err) {
        throw new Error(`Error retrieving restaurant: ${err.message}`);
    }

}

const deleteRestaurants = async (req, res, next) => {
    try {
        await restaurant.deleteMany();
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: 'deleted all restaurant'})
    }
    catch (err) {
        throw new Error(`Error deleting restaurants: ${err.message}`);
    }
}


//! For restaurantId endpoint:  

const getRestaurant = async (req, res, next) => {
    try {
        const result = await restaurant.findById(req.params.restaurantId);
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    } 
    catch (err) {
        throw new Error (`Error retrieving restaurant with ID of: ${req.params.restaurantId} ${err.message}`);
    }
}

const updateRestaurant = async (req, res, next) => {
    try {
        const result = await restaurant.findByIdAndUpdate(req.params.restaurantId, {
            $set: req.body

        }, {new: true});
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    }
    catch (err) {
        throw new Error(`Error updating restaurant with ID of: ${req.params.restaurantId} ${err.message}`);
    }
}


const deleteRestaurant = async (req, res, next) => {
    try {
        await restaurant.findByIdAndDelete(req.params.restaurantId);
        res 
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `delete restaurant with id: ${req.params.restaurantId}`})
    }
    catch (err) {
        throw new Error(`Error deleting restaurant with ID of: ${req.params.restaurantId} ${err.message}`);
          }
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json( { success: true, msg: `Deleted  the restaurant with id: ${req.params.restaurantId}`}) 
}

//! For '/:restaurantId/ratings/:ratingId' startpoint

const getRestaurantRating = async (req, res, next) => {
    try {
        const restaurant = await restaurant.findById(req.params.restaurantId)
        const rating = restaurant.ratings.find(rating => (rating._id).equals(req.params.ratingId))
        if(!rating) {rating = {success:false, msg: `No rating found with rating id: ${req.params.ratingId}`}}
        res
        .set(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating)

    } catch (err) {
        throw new Error (`Error retrieving raiting with id: ${req.params.ratingId}, ${err.message}`)
    }
}

const updateRestaurantRating = async (req, res, next) => {
    try {
        const restaurant = await restaurant.findById(req.params.restaurantId);
        let rating = restaurant.ratings.find(rating => (rating._id).equals(req.params.ratingId))

        if(rating) {
            const ratingIndexPosition = restaurant.ratings.indexOf(rating)
            restaurant.ratings.splice(ratingIndexPosition, 1, req.body);
            rating = restaurant.ratings[ratingIndexPosition]
            await restaurant.save();
        }
        else {
            rating = {success: false, msg: `No rating found with the id: ${req.params.ratingId}`}
        }

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating);
    }
    catch (err) {
        throw new Error (`Error updating restaurant with Id: ${req.params.ratingId}:${err.message}`)
    }
}

const deleteRestaurantRating = async (req, res, next) => {
    try {
    let restaurant = await restaurant.findById(req.params.restaurantId);
    let rating = restaurant.ratings.find(rating => (rating._id).equals(req.params.ratingId));
        if (rating) {
            const ratingIndexPosition = restaurant.ratings.indexOf(rating);
            restaurant.ratings.splice(ratingIndexPosition, 1);
            rating = {success: true, msg: `Rating with Id: ${req.params.ratingId} deleted`}
            await restaurant.save();

        }
        else {
            rating = {success: false, msg: `No rating found with the id: ${req.params.ratingId}`}
        }

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json(rating)

    }
    catch (err) {
        throw new Error (`Error deleting rating with Id: ${req.params.ratingId} : ${err.message}`)
    }
}


//! For '/:restaurantId/ratings/:ratingId' endpoint

module.exports = {
    
    getRestaurants,
    postRestaurant,
    deleteRestaurants,
    getRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getRestaurantRating,    
    updateRestaurantRating,
    deleteRestaurantRating

}