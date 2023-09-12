const express = require("express");
const { stripePaymentSubscriptions } = require("../controller/subscription");

const router = express.Router();

router.post("/stripePaymentSubscriptions", stripePaymentSubscriptions);

module.exports = router;
