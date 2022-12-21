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
    
    getCartQuantity,
    updateCartQuantity,
    deleteCartQuantity,
    getCartQuantitys,
    postCartQuantity,
    deleteCartQuantitys
 
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

    router.route('/:cartId/foods/:foodsId')
    .get(reqRecievedLogger, getCartFood)
    .put(reqRecievedLogger, updateCartFood)
    .delete(reqRecievedLogger, deleteCartFood)

    router.route('/:cartId/quantity')
    .get(reqRecievedLogger, getCartQuantitys)
    .post(reqRecievedLogger, postCartQuantity)
    .delete(reqRecievedLogger, deleteCartQuantitys)

    router.route('/:cartId/quantity/:quantityId')
    .get(reqRecievedLogger, getCartQuantity)
    .put(reqRecievedLogger, updateCartQuantity)
    .delete(reqRecievedLogger, deleteCartQuantity)

    module.exports = router;