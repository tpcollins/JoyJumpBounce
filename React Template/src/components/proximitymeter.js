// import { useState, useEffect } from "react";
// import { getCoordinates } from "../../pages/api/getCoordinates";

// const ProximityMeter = ({ address, onUpdateCharge }) => {
//     const [deliveryCharge, setDeliveryCharge] = useState(null);
//     const [clientCoordinates, setClientCoordinates] = useState([]);
//     const [milesOver, setMilesOver] = useState(false);

//     // Function to calculate distance between two coordinates
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
//         return distance * 0.621371; // Convert to miles
//     }

//     // Function to calculate delivery charge based on distance
//     const calculateDeliveryCharge = async (address, clientCoordinates) => {
//         const userCoordinates = await getCoordinates(address);
//         if (userCoordinates) {
//             console.log("user coordinates ", userCoordinates);
//             console.log("client coordinates ", clientCoordinates);
//             const distance = calculateDistance(userCoordinates, clientCoordinates);
//             const baseDistance = 15; // Free delivery up to 15 miles
//             const extraChargePerMile = 5; // Charge per extra mile

//             if (distance > baseDistance) {
//                 const extraDistance = distance - baseDistance;
//                 setMilesOver(true);
//                 return extraDistance * extraChargePerMile;
//             }
//             setMilesOver(false);
//             return 0; // No extra charge within 15 miles
//         }
//         return null; // Error handling for coordinates not found
//     };

//     const isFullAddress = (address) => {
//         if (address) {
//             const addressParts = address.split(',');
    
//             if (addressParts.length === 3) {
//                 const street = addressParts[0]?.trim();
//                 const city = addressParts[1]?.trim();
//                 const stateZip = addressParts[2]?.trim();
    
//                 // Ensure we have both state and zip by splitting and checking length
//                 const [state, zip] = stateZip.split(' ').filter(part => part);
    
//                 // Return true only if all parts are non-empty
//                 return street && city && state && zip;
//             }
//         }
//         return false;
//     };
    

//     useEffect(() => {
//         console.log("isFullAddress:", isFullAddress(address));
//         if (isFullAddress(address)) {
//             (async () => {
//                 setClientCoordinates([-87.532720, 33.239110]); // Replace with actual client coordinates
//                 const charge = await calculateDeliveryCharge(address, clientCoordinates);
//                 setDeliveryCharge(charge);
//                 onUpdateCharge(charge); // Pass the charge back to the parent component
//             })();
//         } else {
//             // Reset the delivery charge and milesOver state if the address is incomplete
//             setDeliveryCharge(null);
//             setMilesOver(false);
//         }
//     }, [address]);
    

//     return (
//         <div>
//             {milesOver && (
//                 <div className="delivery-disclaimer">
//                     <h2
//                     style={{
//                         fontSize: '1.2em'
//                     }}
//                     >* There is a Delivery Charge of $5 for Every Mile Exceeding 15 Miles from our Address</h2>
//                     <h2
//                     style={{
//                         fontSize: '1.4em'
//                     }}
//                     >Delivery Charge: ${deliveryCharge?.toFixed(2)}</h2>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProximityMeter;

// **** DELETING THE COMMENTED OUT CODE ABOVE CAUSES THE PROXIMITY METER TO BREAK FOR SOME REASON. DO NOT DELETE IT ****
import { useState, useEffect } from "react";
import { getCoordinates } from "../../pages/api/getCoordinates";

const ProximityMeter = ({ street, city, state, zip, onUpdateCharge }) => {
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

    // Simplified function to check if the full address is entered
    const isFullAddress = () => {
        console.log("Checking isFullAddress with values:", { street, city, state, zip });
        console.log("Miles Over: ", milesOver);
        console.log("Delivery Charge: ", deliveryCharge);
        return street && city && state && zip;
    };

    // Function to calculate delivery charge based on distance
    const calculateDeliveryCharge = async (address, clientCoordinates) => {
        const userCoordinates = await getCoordinates(`${street}, ${city}, ${state} ${zip}`);
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

    // useEffect to recalculate delivery charge when address is complete
    // useEffect(() => {
    //     if (isFullAddress()) {
    //         (async () => {
    //             setClientCoordinates([-87.532720, 33.239110]); // Set your client coordinates
    //             const charge = await calculateDeliveryCharge(`${street}, ${city}, ${state} ${zip}`, clientCoordinates);
    //             setDeliveryCharge(charge);
    //             onUpdateCharge(charge); // Pass the charge back to the parent component
    //         })();
    //     } else {
    //         // Reset the delivery charge and milesOver state if the address is incomplete
    //         setDeliveryCharge(null);
    //         setMilesOver(false);
    //     }
    // }, [street, city, state, zip]); // Only re-run when any part of the address changes

    useEffect(() => {
        const handleDeliveryCalculation = async () => {
            if (isFullAddress()) {
                setClientCoordinates([-87.532720, 33.239110]); // Set your client coordinates
                const charge = await calculateDeliveryCharge(`${street}, ${city}, ${state} ${zip}`, clientCoordinates);
                setDeliveryCharge(charge);
                onUpdateCharge(charge); // Pass the charge back to the parent component
                console.log("Delivery Charge:", charge);
                console.log("Miles Over:", charge > 0); // Assuming charge > 0 means it's over the limit
            } else if (street || city || state || zip) {
                // Partial address entered - wait for autofill to complete before resetting
                console.log("Partial address detected, waiting for autofill...");
            } else {
                // No address fields are populated, reset delivery charge and milesOver
                setDeliveryCharge(null);
                setMilesOver(false);
                console.log("Resetting delivery charge and milesOver.");
            }
        };
    
        handleDeliveryCalculation();
    }, [street, city, state, zip, deliveryCharge, milesOver]); // Only re-run when any part of the address changes

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
