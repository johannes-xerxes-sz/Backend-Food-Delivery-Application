const stripe = require('stripe')('sk_test_51ME50LADTB6s80w4mWZa9Lp5EamC5PTS9xEps13JxBeQqxqDWZanqZ5XJguPMNlwU1IyoPXKsc8OtECDZqgCPWUT00WGsRjKKa');

// `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
const charge = await stripe.charges.create({
  amount: 2000,
  currency: 'usd',
  source: 'tok_mastercard',
  description: 'My First Test Charge (created for API docs at https://www.stripe.com/docs/api)',
});


/* const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51ME50LADTB6s80w4mWZa9Lp5EamC5PTS9xEps13JxBeQqxqDWZanqZ5XJguPMNlwU1IyoPXKsc8OtECDZqgCPWUT00WGsRjKKa');

app.use(express.json());

app.post('/pay', async (req, res) => {
  try {
    const { amount, source, currency, description, payment_method, confirm } = req.body;

    const payment = await stripe.charges.create({
      amount,
      description,
      currency,
      payment_method,
      confirm,
      source,
    });

    res.json({ message: 'Payment successful!' });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
 */