const stripe = require('stripe')('sk_test_PMu0toADvySzealBQaLl7A1S00ijClNVLG')

exports.handler = async (event) => {
    const {
        tokenId,
        email,
        name, 
        description, 
        amount
    } = JSON.parse(event.body);

    const customer = await stripe.customers.create({
        description: email,
        source: tokenId
    });

    await stripe.charges.create({
        customer: customer.id,
        description,
        amount,
        name,
        currency: 'usd'
    })
}