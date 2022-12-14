const express = require('express');
const router = express.Router();
const {
    getCarts,
    postCart,
    deleteCarts,
    getCart,
    updateCart,
    deleteCart
 
} = require('../controllers/CartController');
const reqRecievedLogger  = require('../middlewares/reqRecievedLogger')
const {cartValidator} = require('../middlewares/utils/validators')
 

//root

router.route('/')
    .get(reqRecievedLogger, getCarts)
    .post(reqRecievedLogger, cartValidator, postCart)
    .delete(reqRecievedLogger, deleteCarts)

 
    router.route('/:cartId')
    .get(reqRecievedLogger, getCart)
    .put(reqRecievedLogger, updateCart)
    .delete(reqRecievedLogger, deleteCart)

    module.exports = router;