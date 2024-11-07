import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

const geocodingClient = mbxGeocoding({ accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN });

export async function getCoordinates(address) {
  try {
    const response = await geocodingClient
      .forwardGeocode({
        query: address,
        limit: 1,
      })
      .send();
    
    const match = response.body;
    if (match.features.length > 0) {
      return match.features[0].geometry.coordinates; // [longitude, latitude]
    }
    return null;
  } catch (error) {
    console.error('Error fetching coordinates:', error);
  }
}
