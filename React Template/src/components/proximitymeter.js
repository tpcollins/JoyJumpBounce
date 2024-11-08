import { useState, useEffect } from "react";
import { getCoordinates } from "../../pages/api/getCoordinates";

const ProximityMeter = ({ address, onUpdateCharge }) => {
    const [deliveryCharge, setDeliveryCharge] = useState(null);
    const [clientCoordinates, setClientCoordinates] = useState([]);
    const [milesOver, setMilesOver] = useState(false);

    // Function to calculate distance between two coordinates
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
        return distance * 0.621371; // Convert to miles
    }

    // Function to calculate delivery charge based on distance
    const calculateDeliveryCharge = async (address, clientCoordinates) => {
        const userCoordinates = await getCoordinates(address);
        if (userCoordinates) {
            console.log("user coordinates ", userCoordinates);
            console.log("client coordinates ", clientCoordinates);
            const distance = calculateDistance(userCoordinates, clientCoordinates);
            const baseDistance = 15; // Free delivery up to 15 miles
            const extraChargePerMile = 5; // Charge per extra mile

            if (distance > baseDistance) {
                const extraDistance = distance - baseDistance;
                setMilesOver(true);
                return extraDistance * extraChargePerMile;
            }
            setMilesOver(false);
            return 0; // No extra charge within 15 miles
        }
        return null; // Error handling for coordinates not found
    };


    if(address){
        const addressParts = address.split(',');

        if (addressParts.length >= 3){
            const street = addressParts[0] ? addressParts[0].trim() : '';
            const city = addressParts[1] ? addressParts[1].trim() : '';
            const state = addressParts[2] ? addressParts[2].trim() : '';
            const zip = addressParts[3] ? addressParts[3].trim() : '';

            console.log("Street: ", street, "city ", city, "state ", state, "zip", zip)
        }
    }

    



    const isFullAddress = (address) => {
        if (address) {
            const addressParts = address.split(',');
    
            if (addressParts.length >= 3) {
                const street = addressParts[0] ? addressParts[0].trim() : '';
                const city = addressParts[1] ? addressParts[1].trim() : '';
                const stateZip = addressParts[2] ? addressParts[2].trim() : '';
    
                // Split state and zip from the last part
                const [state = '', zip = ''] = stateZip.split(' ');
    
                // Return true if all parts are filled in
                return street && city && state && zip;
            }
        }
        return false; // Return false if address is incomplete
    };

    useEffect(() => {
        if (isFullAddress(address)) {
            (async () => {
                setClientCoordinates([-87.532720, 33.239110]); // Set your client coordinates
                const charge = await calculateDeliveryCharge(address, clientCoordinates);
                setDeliveryCharge(charge);
                onUpdateCharge(charge); // Pass the charge back to the parent component
            })();
        }
    }, [address]); // Only re-run when `address` changes
    

    return (
        <div>
            {milesOver && (
                <div className="delivery-disclaimer">
                    <h2
                    style={{
                        fontSize: '1.2em'
                    }}
                    >* There is a Delivery Charge of $5 for Every Mile Exceeding 15 Miles from our Address</h2>
                    <h2
                    style={{
                        fontSize: '1.4em'
                    }}
                    >Delivery Charge: ${deliveryCharge?.toFixed(2)}</h2>
                </div>
            )}
        </div>
    );
};

export default ProximityMeter;


// const ProximityMeter = ({ address, onUpdateCharge }) => {
//     const [deliveryCharge, setDeliveryCharge] = useState(null);
//     const [clientCoordinates, setClientCoordinates] = useState([]);
//     const [milesOver, setMilesOver] = useState(false);

//     function calculateDistance(coord1, coord2) {
//         const [lon1, lat1] = coord1;
//         const [lon2, lat2] = coord2;
//         const R = 6371; // Radius of the Earth in km
 
//         const dLat = (lat2 - lat1) * (Math.PI / 180);
//         const dLon = (lon2 - lon1) * (Math.PI / 180);
//         const a =
//             Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//             Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
//             Math.sin(dLon / 2) * Math.sin(dLon / 2);
//         const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//         const distance = R * c; // Distance in km

//         console.log("distance: ", distance);
//         console.log("distance * 0.621371: ", distance * 0.621371);
//         return distance * 0.621371; // Convert to miles
//     }

//     async function calculateDeliveryCharge(address, clientCoordinates) {
//         const userCoordinates = await getCoordinates(address);
//         if (userCoordinates) {
//             setClientCoordinates([[-87.532720, 33.239110]])
//             const distance = calculateDistance(userCoordinates, clientCoordinates);
//             const baseDistance = 15; // Free delivery up to 15 miles
//             const extraChargePerMile = 5; // Charge per extra mile

//             if (distance > baseDistance) {
//                 const extraDistance = distance - baseDistance;
//                 console.log(extraDistance)
//                 console.log("extraDistance * extraChargePerMile: ", extraDistance * extraChargePerMile);
//                 setMilesOver(true);
//                 return extraDistance * extraChargePerMile;
//             }
//             return 0; // No extra charge within 15 miles
//         }
//         return null; // Error handling for coordinates not found
//     }

//     useEffect(() => {
//         const updateCharge = async () => {
//             const charge = await calculateDeliveryCharge(address, clientCoordinates);
//             setDeliveryCharge(charge);
//             onUpdateCharge(charge); // Pass charge up to parent component
//         };
//         if (address) {
//             updateCharge();
//         }
//         console.log(address)
//         console.log(clientCoordinates)
//     }, [address, clientCoordinates]);

//     return (
//         <>
//             {milesOver && (
//                 <div>
//                     <p>Delivery Charge: ${deliveryCharge.toFixed(2)}</p>
//                 </div>
//             )}
//         </>
//     );    
// };

// export default ProximityMeter;