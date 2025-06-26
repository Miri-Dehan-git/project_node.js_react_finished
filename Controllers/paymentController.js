const paymentService = require('../serverService/paymentService');

async function createCheckoutSession(req, res) {
  try {
    const userId = req.user._id;
    // console.log("_id in createCheckoutSession",userId)
    // console.log("email",req.user.email)
    const session = await paymentService.createCheckoutSession(userId);
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Payment error:', error.message);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
}

module.exports = {
  createCheckoutSession,
};
