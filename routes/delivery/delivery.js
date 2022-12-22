const express = require('express');
const router = express.Router();

const {
    getDeliverys,
    postDelivery,
    deleteDeliverys,
    getDelivery,
    updateDelivery,
    deleteDelivery
} = require('../../controllers/deliveryController/deliveryController');
const reqRecievedLogger = require('../../middlewares/reqRecievedLogger')
// const {deliveryValidator} = require('../../middlewares/utils/validators')
 

//root

router.route('/')
    .get(reqRecievedLogger, getDeliverys)
    .post(reqRecievedLogger, postDelivery) // validator
    .delete(reqRecievedLogger, deleteDeliverys)


    router.route('/:deliveryId')
    .get(reqRecievedLogger, getDelivery) 
    .put(reqRecievedLogger, updateDelivery)
    .delete(reqRecievedLogger, deleteDelivery)


    module.exports = router;