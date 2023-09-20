const STRIPE_SECRET_KEY =
  "sk_test_51NPIIcIZdV9QhwgtsufITTvZ1GY3pBEdCG7Txsby2OOnrA1DwARHxsjZn7kzCbw6CxccsVIyUzsBV44Bui6Dsy3t00YnzVVbM2";
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const createSubscription = async (createSubscriptionRequest) => {
  // create a stripe customer
  const customer = await this.stripe.customers.create({
    name: createSubscriptionRequest.name,
    email: createSubscriptionRequest.email,
    payment_method: createSubscriptionRequest.paymentMethod,
    invoice_settings: {
      default_payment_method: createSubscriptionRequest.paymentMethod,
    },
  });

  // get the price id from the front-end
  const priceId = createSubscriptionRequest.priceId;

  // create a stripe subscription
  const subscription = await this.stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: priceId }],
    payment_settings: {
      payment_method_options: {
        card: {
          request_three_d_secure: "any",
        },
      },
      payment_method_types: ["card"],
      save_default_payment_method: "on_subscription",
    },
    expand: ["latest_invoice.payment_intent"],
  });

  // return the client secret and subscription id
  return {
    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    subscriptionId: subscription.id,
  };
};

exports.stripePaymentSubscriptions = async (req, res) => {
  // let {
  //   email,
  //   payment_method,
  //   cvc,
  //   cardNum,
  //   exp_year,
  //   exp_month,
  //   amount,
  //   userId,
  //   customer_id,
  // } = req.body;
  console.log("call", req.body);

  try {
    let { card, email, id } = req.body;
    // console.log("id here", card.id, card.name, email);
    // create token
    // const token = await stripe.tokens.create({
    //   card: {
    //     number: cardNum,
    //     exp_month: exp_month,
    //     exp_year: exp_year,
    //     cvc: cvc,
    //   },
    // });
    // console.log("token", token.id);
    // create customer
    let customer = await stripe.customers.create({
      name: card.name,
      email: email,
      source: id,
    });
    console.log("customer", customer.id);
    const subscription = await stripe.subscriptions.create({
      // customer: 'cus_MZQSpOn0dSItOX',
      customer: customer.id,
      items: [
        //   {price: 'price_1LtvSJEqCRWTYE4oBLRSccCJ'},
        { price: "price_1NpVKBIZdV9QhwgttmoNllH8" },
      ],
    });
    console.log("subscription", subscription.id);
    res.status(200).json({ success: true, message: "Payment Successful" });
  } catch (err) {
    console.log("err fail", err);
    res.status(400).json({
      success: false,
      message: "Payment Failed",
    });
  }
};
