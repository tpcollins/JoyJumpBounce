export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  var Airtable = require('airtable');
  var base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN }).base(process.env.AIRTABLE_BASE_ID);

  const { cartItems } = req.body;

  const formatDate = (date) => {
    if (!date) return ''; // Return empty string if date is invalid
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const formatTime = (time) => {
      if (!time || typeof time !== 'string' || !time.includes(':')) {
          return ''; // Return empty string if time is invalid
      }
      const [hour, minute] = time.split(':');
      let hourInt = parseInt(hour, 10);
      const ampm = hourInt >= 12 ? 'PM' : 'AM';
      hourInt = hourInt % 12 || 12;
      return `${hourInt}:${minute} ${ampm}`; 
  };

  try {
    base('Bookings').create(
      cartItems.map((item) => ({
        fields: {
          'Order ID': item.orderId,
          'First Name': item.firstName,
          'Last Name': item.lastName,
          'Email': item.email,
          'Item': item.title,  // The title of the item
          'Quantity': item.quantity,
          'Price':  Number(item.price),       // The price of the item
          'Booking Date': formatDate(item.date),
          'Event Start Time': formatTime(item.setupTime),   // Default value
          'Turf': item.turf,           // Default value
          'Water Hookup': item.waterHookup,      // Default value
          'Power Hookup': item.powerHookup,      // Default value
          'Phone Number': item.phoneNumber, // Default value
          'Address': item.address,  // Default value
          'City': item.city,
          'State': item.state,
          'Zip Code': item.zipCode,
          'Total Price': item.totalPrice,
          'Delivery Charge': item.deliveryCharge
        },
      })),
      function (err, records) {
        if (err) {
          console.error('Error writing to Airtable:', err);
          return res.status(422).json({ message: 'Error writing to Airtable', error: err.message });
        }

        records.forEach(function (record) {
          console.log('Record added with ID:', record.getId());
        });

        res.status(200).json({ message: 'Records successfully added to Airtable' });
      }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Unexpected error occurred', error: error.message });
  }
}
