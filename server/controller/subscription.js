const STRIPE_SECRET_KEY =
  "sk_test_51NPIIcIZdV9QhwgtsufITTvZ1GY3pBEdCG7Txsby2OOnrA1DwARHxsjZn7kzCbw6CxccsVIyUzsBV44Bui6Dsy3t00YnzVVbM2";
const stripe = require("stripe")(STRIPE_SECRET_KEY);
exports.stripePaymentSubscriptions = async (req, res) => {
  let {
    email,
    payment_method,
    cvc,
    cardNum,
    exp_year,
    exp_month,
    amount,
    userId,
    customer_id,
  } = req.body;
  console.log("call", req.body);
  try {
    // create token
    const token = await stripe.tokens.create({
      card: {
        number: cardNum,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: cvc,
      },
    });
    console.log("token", token.id);
    // create customer
    // let customer = await stripe.customers.create({
    //   name: email,
    //   email: email,
    //   source: token.id,
    // });
    // console.log("customer", customer.id);

    // const subscription = await stripe.subscriptions.create({
    //   // customer: 'cus_MZQSpOn0dSItOX',
    //   customer: customer.id,
    //   items: [
    //     //   {price: 'price_1LtvSJEqCRWTYE4oBLRSccCJ'},
    //     { price: "price_1NpVKBIZdV9QhwgttmoNllH8" },
    //   ],
    // });
    // console.log("subscription", subscription.id);

    res.status(200).json({ success: true, message: "Payment Successful" });
  } catch (err) {
    console.log("err fail", err);
    res.status(400).json({
      success: false,
      message: "Payment Failed",
    });
  }
};
