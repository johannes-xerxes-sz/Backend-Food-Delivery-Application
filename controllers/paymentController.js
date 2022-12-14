const Payment = require("../models/Payment");
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51ME50LADTB6s80w4mWZa9Lp5EamC5PTS9xEps13JxBeQqxqDWZanqZ5XJguPMNlwU1IyoPXKsc8OtECDZqgCPWUT00WGsRjKKa');

const postPayment = async (req, res, next) => {
    try {
        // const payment = await Payment.create(req.body);
    // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token

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