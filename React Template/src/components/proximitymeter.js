import { useState, useEffect } from "react";
import { getCoordinates } from "../../pages/api/getCoordinates";

const ProximityMeter = ({ address, onUpdateCharge }) => {
    const [deliveryCharge, setDeliveryCharge] = useState(null);
    const [clientCoordinates, setClientCoordinates] = useState([]);
    const [milesOver, setMilesOver] = useState(false);

    function calculateDistance(coord1, coord2) {
        const [lon1, lat1] = coord1;
        const [lon2, lat2] = coord2;
        const R = 6371; // Radius of the Earth in km

        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km

        console.log("distance: ", distance);
        console.log("distance * 0.621371: ", distance * 0.621371);
        return distance * 0.621371; // Convert to miles
    }

    async function calculateDeliveryCharge(address, clientCoordinates) {
        const userCoordinates = await getCoordinates(address);
        if (userCoordinates) {
            setClientCoordinates([[-87.532720, 33.239110]])
            const distance = calculateDistance(userCoordinates, clientCoordinates);
            const baseDistance = 15; // Free delivery up to 15 miles
            const extraChargePerMile = 5; // Charge per extra mile

            if (distance > baseDistance) {
                const extraDistance = distance - baseDistance;
                console.log(extraDistance)
                console.log("extraDistance * extraChargePerMile: ", extraDistance * extraChargePerMile);
                setMilesOver(true);
                return extraDistance * extraChargePerMile;
            }
            return 0; // No extra charge within 15 miles
        }
        return null; // Error handling for coordinates not found
    }

    useEffect(() => {
        const updateCharge = async () => {
            const charge = await calculateDeliveryCharge(address, clientCoordinates);
            setDeliveryCharge(charge);
            onUpdateCharge(charge); // Pass charge up to parent component
        };
        if (address) {
            updateCharge();
        }
        console.log(address)
        console.log(clientCoordinates)
    }, [address, clientCoordinates]);

    return (
        <>
            {milesOver && (
                <div>
                    <p>Delivery Charge: ${deliveryCharge.toFixed(2)}</p>
                </div>
            )}
        </>
    );    
};

export default ProximityMeter;