const Payment = require("../models/Payment");

const getPayments = async (req, res, next) => {

    const filter = {};
    const options = {};
    if(Object.keys(req.query).length){
        // query parameter
        const {
            amount,
            currency,
            source,
            description,
            sortByAmount
        } = req.query

        if(amount) filter.amount = true
        if(currency) filter.currency = true
        if(source) filter.source = true
        if(description) filter.description = true


        if(limit) options.limit = limit
        if (sortByAmount) {
            options.sort = {
              amount: sortByAmount === 'asc' ? 1 : -1
            };
          }
    }

    try {
        const payment = await Payment.find({ }, filter, options)
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(payment)

    } catch (err) {
        throw new Error(`Error retrieving all payment: ${err.message}`)
    }
    
}

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
    getPayments,
    postPayment
}