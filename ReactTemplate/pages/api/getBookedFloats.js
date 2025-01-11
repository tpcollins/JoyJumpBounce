// pages/api/getBookedFloats.js
import Airtable from 'airtable';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { selectedDate } = req.body;
  const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN }).base(process.env.AIRTABLE_BASE_ID);

  try {
    const records = await base('Bookings').select({
      filterByFormula: `IS_SAME({Booking Date}, '${selectedDate}', 'day')`,
    }).firstPage();

    const bookedFloats = records.map(record => record.fields['Item']);
    res.status(200).json({ bookedFloats });
  } catch (error) {
    console.error('Error querying Airtable:', error);
    res.status(500).json({ message: 'Failed to retrieve booked floats', error });
  }
}
