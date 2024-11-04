// pages/api/checkout.js
// import { google } from 'googleapis';

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   // Extract checkout data from the request body
//   const { cartItems, totalPrice } = req.body;

//   try {
//     // Initialize the JWT client with environment variables
//     const jwtClient = new google.auth.JWT(
//       process.env.GOOGLE_CLIENT_EMAIL,
//       null,
//       process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Replace escaped newlines with actual newlines
//       ['https://www.googleapis.com/auth/spreadsheets']
//     );

//     // Authorize the client
//     await jwtClient.authorize();

//     // Initialize Google Sheets API
//     const sheets = google.sheets({ version: 'v4', auth: jwtClient });

//     // Define the spreadsheet ID and range where data will be added
//     const spreadsheetId = process.env.GOOGLE_SHEET_ID; // Store this ID in your environment variables
//     const range = 'Sheet1!A1'; // Adjust range as necessary for your sheet structure

//     // Format the data to append
//     const values = cartItems.map((item, index) => [
//         index + 1,           // Item number
//         item.title,          // Item title
//         item.price,          // Item price
//       ]);

//     // Append the total price at the end of the data
//     values.push(['Total Price', totalPrice]);

//     // Configure the request to append data to Google Sheets
//     await sheets.spreadsheets.values.append({
//       spreadsheetId,
//       range,
//       valueInputOption: 'RAW',
//       resource: {
//         values,
//       },
//     });

//     // Send a success response
//     res.status(200).json({ message: 'Checkout data added to Google Sheets successfully' });
//   } catch (error) {
//     console.error('Error writing to Google Sheets:', error);
//     res.status(500).json({ message: 'Failed to write to Google Sheets', error });
//   }
// }


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  var Airtable = require('airtable');
  var base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN }).base(process.env.AIRTABLE_BASE_ID);

  const { cartItems } = req.body;

  try {
    base('Booking').create(
      cartItems.map((item) => ({
        fields: {
          'Inflatable': item.title,  // The title of the item
          'Price': Number(item.price),       // The price of the item
          'Booking Date': '11/4/2024',   // Ensure date format matches Airtable's expected format (YYYY-MM-DD)
          'Setup Time': '11:45am',   // Default value
          'Turf': 'Grass',           // Default value
          'Water Hookup': 'No',      // Default value
          'Power Hookup': 'No',      // Default value
          'Phone Number': '(205) 454-2111', // Default value
          'Address': '3002 Fox St',  // Default value
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
