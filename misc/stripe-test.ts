// Set your secret key. Remember to switch to your live secret key in production!

// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('SECRET');

async function main() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'usd',
    payment_method_types: ['card'],
    receipt_email: 'jenny.rosen@example.com',
  });
  console.log(paymentIntent);
}

main();