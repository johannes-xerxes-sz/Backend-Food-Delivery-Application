const express = require('express');
const router = express.Router();
const {
    getRestaurants,
    postRestaurant,
    deleteRestaurants,
    getRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getRestaurantRatings,
    postRestaurantRating,
    deleteRestaurantRatings,
    getRestaurantRating,
    updateRestaurantRating,
    deleteRestaurantRating

} = require('../controllers/restaurantController');
 const reqRecievedLogger = require('../middlewares/reqRecievedLogger')
const {restaurantValidator} = require('../middlewares/utils/validators')


//root

router.route('/')
    .get(reqRecievedLogger, getRestaurants)
    .post(reqRecievedLogger, restaurantValidator, postRestaurant)
    .delete(reqRecievedLogger, deleteRestaurants)


    router.route('/:restaurantId')
    .get(reqRecievedLogger, getRestaurant)
    .put(reqRecievedLogger, updateRestaurant)
    .delete(reqRecievedLogger, deleteRestaurant)

    // ratings

    router.route('/:restaurantId/ratings')
    .get(reqRecievedLogger, getRestaurantRatings)
    .post(reqRecievedLogger, postRestaurantRating)
    .delete(reqRecievedLogger, deleteRestaurantRatings)

    router.route('/:restaurantId/ratings/:ratingId')
    .get(reqRecievedLogger, getRestaurantRating)
    .put(reqRecievedLogger, updateRestaurantRating)
    .delete(reqRecievedLogger, deleteRestaurantRating)

    module.exports = router;