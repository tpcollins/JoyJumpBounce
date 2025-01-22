import { Client, Environment } from 'square';

// Initialize Square client
const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Production,
});

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end(); // Handle preflight request
    return;
  }

  if (req.method === 'POST') {
    const { token, firstName, lastName, price } = req.body;

    if (!token || !firstName || !lastName || !price) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const idempotencyKey = new Date().getTime().toString();

    try {
      // Ensure price is a valid integer
      if (!Number.isInteger(price)) {
          res.status(400).json({ error: 'Price must be an integer.' });
          return;
      }
  
      const response = await squareClient.paymentsApi.createPayment({
          sourceId: token,
          idempotencyKey: idempotencyKey,
          amountMoney: {
              amount:  Number(price), // Ensure it's a valid number
              // amount:  1, // Ensure it's a valid number
              currency: 'USD',
          },
          customerDetails: {
              givenName: firstName,
              familyName: lastName,
          },
      });
  
      // Sanitize response to avoid BigInt serialization issues
      const sanitizedResponse = JSON.parse(
          JSON.stringify(response, (_, value) =>
              typeof value === 'bigint' ? value.toString() : value
          )
      );
  
      console.log("Sanitized Response:", sanitizedResponse);
      res.status(200).json({ success: true, payment: sanitizedResponse });
    } catch (error) {
        console.error('Error creating payment:', error);
    
        // Handle specific serialization or validation issues
        if (error.message.includes('BigInt')) {
            res.status(500).json({ error: 'Price cannot be a BigInt. Ensure it is a valid integer.' });
        } else {
            res.status(500).json({ error: 'Failed to create payment.' });
        }
    }
  }  
}
