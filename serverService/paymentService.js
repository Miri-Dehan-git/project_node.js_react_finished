const stripe = require('../config/stripe');

async function createCheckoutSession(userId) {
    console.log('Creating checkout session for user:', userId);
    return await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'מנוי פרימיום לכל החיים',
                        description: 'תשלום חד פעמי לגישה מלאה',

                    },
                    unit_amount: 5000,
                
                },
                quantity: 1,
            },
        ],
         mode: 'payment', 
        client_reference_id: userId, 
        success_url: 'http://localhost:3000/success-payment',
        cancel_url: 'http://localhost:3000/cancel',
    });
}

module.exports = {
    createCheckoutSession,
};
