// pages/api/getBookedFloats.js
import Airtable from 'airtable';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { itemsToCheck } = req.body;
  const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN }).base(process.env.AIRTABLE_BASE_ID);

  try {
    // Extract unique dates to minimize the filter formula length
    const dates = [...new Set(itemsToCheck.map(item => item.date))];

    // Build a filter formula to check for any matching date
    const filterFormula = `OR(${dates
      .map(date => `IS_SAME({Booking Date}, '${date}', 'day')`)
      .join(',')})`;

    const records = await base('Bookings').select({
      filterByFormula: filterFormula,
    }).firstPage();

    // Return an array of objects with title and date
    const bookedFloats = records.map(record => ({
      title: record.fields['Item'],
      date: new Date(record.fields['Booking Date']).toLocaleDateString('en-US'),
    }));

    res.status(200).json({ bookedFloats });
  } catch (error) {
    console.error('Error querying Airtable:', error);
    res.status(500).json({ message: 'Failed to retrieve booked floats', error });
  }
}
