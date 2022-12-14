const Payment = require("../models/Payment");
// require('dotenv').config()

const postPayment = async (req, res, next) => {
    try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const payment = await stripe.charges.create(req.body);
    const {
        amount,
        currency,
        source,
        description
    }= payment

    const charge = await Payment.create({
        amount,
        currency,
        source: source.brand,
        description
    });
        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(charge)
    }
    catch (err)
    {
        throw new Error(`Error deleting Payment: ${err.message}`);
    }
}



module.exports = {
    postPayment
}