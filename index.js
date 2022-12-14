const stripe = require("stripe")(process.env.STRIPE_KEY);

// const Stripe = require('stripe');
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

console.log(stripe)