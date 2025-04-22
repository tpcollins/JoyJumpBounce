export default async function handler(req, res) {
    const { destination } = req.query;

    const apiKey = process.env.MAPS_API_KEY;
    const origin = encodeURIComponent("2308 2nd Ave NE, Tuscaloosa, AL 35406");
    const encodedDestination = encodeURIComponent(destination);

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${encodedDestination}&units=imperial&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.rows[0].elements[0].status === "OK") {
            const distanceText = data.rows[0].elements[0].distance.text;
            const miles = parseFloat(distanceText.replace(" mi", ""));
            res.status(200).json({ miles });
        } else {
            res.status(400).json({ error: "Invalid response from Google API" });
        }
    } catch (error) {
        console.error("Error fetching Google API:", error);
        res.status(500).json({ error: "Server error" });
    }
}
