import { stripe as secrets } from '@parm/util';
const stripe = require('stripe')(secrets.secretKey);

export const functionCreateCheckout = async (req: any, res?: any) => {
  const domainURL = 'https://parm.app?focus=';

  const { quantity } = req.body;
  // Create new Checkout Session for the order
  // Other optional params include:
  // [billing_address_collection] - to display billing address details on the page
  // [customer] - if you have an existing Stripe Customer ID
  // [customer_email] - lets you prefill the email input in the Checkout page
  // For full details see https://stripe.com/docs/api/checkout/sessions/create
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price: 'price_1HYg2II41a7FhhGLDGWMmYmr',
        quantity: quantity
      },
    ],
    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `${domainURL}?checkout-success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}?checkout-canceled`,
  });

  res.send({
    sessionId: session.id,
  });
};
