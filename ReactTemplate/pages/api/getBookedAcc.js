import Airtable from 'airtable';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { date } = req.body; // `date` is passed from the frontend

  // Define the total quantities
  const totalTables = 10;
  const totalChairs = 40;
  const totalTent = 1;
  const totalGenerator = 1;

  const base = new Airtable({ apiKey: process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN }).base(process.env.AIRTABLE_BASE_ID);

  try {
    // Query Airtable for bookings on the specified date
    const records = await base('Bookings').select({
      filterByFormula: `IS_SAME({Booking Date}, '${date}', 'day')`,
    }).firstPage();

    // Count booked quantities
    let bookedTables = 0;
    let bookedChairs = 0;
    let isTentBooked = false;
    let isGeneratorBooked = false;

    records.forEach((record) => {
      const item = record.fields['Item'];
      const quantity = record.fields['Quantity'] || 1; // Default to 1 if no quantity field exists

      if (item === 'Table') {
        bookedTables += quantity;
      } else if (item === 'Chair') {
        bookedChairs += quantity;
      } else if (item === 'Inflatable Tent') {
        isTentBooked = true;
      } else if (item === 'Generator') {
        isGeneratorBooked = true;
      }
    });

    // Calculate remaining quantities
    const availableTables = totalTables - bookedTables;
    const availableChairs = totalChairs - bookedChairs;

    res.status(200).json({
      available: {
        tables: Math.max(availableTables, 0),
        chairs: Math.max(availableChairs, 0),
        tent: !isTentBooked,
        generator: !isGeneratorBooked,
      },
    });
  } catch (error) {
    console.error('Error querying Airtable:', error);
    res.status(500).json({ message: 'Failed to retrieve accessory availability', error });
  }
}
