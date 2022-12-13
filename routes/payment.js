const express = require('express');
const router = express.Router();
const {
    postPayment
 
} = require('../controllers/paymentController');
const reqRecievedLogger  = require('../middlewares/reqRecievedLogger')
const {paymentValidator} = require('../middlewares/utils/validators')
 

//root

router.route('/')
    .post(reqRecievedLogger, paymentValidator, postPayment)
    module.exports = router;