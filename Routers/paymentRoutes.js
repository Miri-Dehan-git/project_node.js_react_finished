const express = require('express');
const verifyJWT = require("../Middelwares/verifyJWT")

const router = express.Router();
const paymentController = require('../Controllers/paymentController');

router.post('/create-checkout-session',verifyJWT, paymentController.createCheckoutSession);

module.exports = router;
