const express = require('express');
const router = express.Router();
const {
    getCarts,
    postCart,
    deleteCarts,
    getCart,
    updateCart,
    deleteCart,
    getCartFood,
    updateCartFood,
    deleteCartFood,
    getCartFoods,
    postCartFood,
    deleteCartFoods,
    
    getCartFoodQuantity,
    updateCartFoodQuantity,
    deleteCartFoodQuantity,
    getCartFoodQuantitys,
    postCartFoodQuantity,
    deleteCartFoodQuantitys
 
} = require('../../controllers/deliveryController/cartController');
const reqRecievedLogger  = require('../../middlewares/reqRecievedLogger')
// const {cartValidator} = require('../middlewares/utils/validators')
 

//root

router.route('/')
    .get(reqRecievedLogger, getCarts)
    .post(reqRecievedLogger, postCart)
    .delete(reqRecievedLogger, deleteCarts)

 
    router.route('/:cartId')
    .get(reqRecievedLogger, getCart)
    .put(reqRecievedLogger, updateCart)
    .delete(reqRecievedLogger, deleteCart)

    router.route('/:cartId/foods')
    .get(reqRecievedLogger, getCartFoods)
    .post(reqRecievedLogger, postCartFood)
    .delete(reqRecievedLogger, deleteCartFoods)

    router.route('/:menuId/foods/:foodsId')
    .get(reqRecievedLogger, getCartFood)
    .put(reqRecievedLogger, updateCartFood)
    .delete(reqRecievedLogger, deleteCartFood)

    router.route('/:menuId/foods/:foodsId/quantity')
    .get(reqRecievedLogger, getCartFoodQuantitys)
    .post(reqRecievedLogger, postCartFoodQuantity)
    .delete(reqRecievedLogger, deleteCartFoodQuantitys)

    router.route('/:menuId/foods/:foodsId/quantity/:quantityId')
    .get(reqRecievedLogger, getCartFoodQuantity)
    .put(reqRecievedLogger, updateCartFoodQuantity)
    .delete(reqRecievedLogger, deleteCartFoodQuantity)

    module.exports = router;