import { Client, Environment } from 'square';

// Initialize Square client
const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Production, // Change to Environment.Sandbox for testing
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
      const response = await squareClient.paymentsApi.createPayment({
        sourceId: token,
        idempotencyKey: idempotencyKey,
        amountMoney: {
          amount: parseInt(price, 10), // Ensure price is an integer
          currency: 'USD',
        },
        customerDetails: {
          givenName: firstName,
          familyName: lastName,
        },
      });

      const paymentResult = response.result.payment;

      res.status(200).json({ success: true, payment: paymentResult });
    } catch (error) {
      console.error('Error creating payment:', error);
      res.status(500).json({ error: 'Failed to create payment' });
    }
  } else {
    res.status(405).json({ error: 'Only POST requests are allowed' });
  }
}
