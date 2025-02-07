import { useState, useEffect, useRef } from 'react'; 
import { Button, Spinner } from 'react-bootstrap';
import { Circles } from 'react-loader-spinner';
// Redux Variables
import { removeItemFromCart, clearCart } from '../redux/slices/cartslice';
import { useSelector, useDispatch } from 'react-redux';
// Proximity Meter
import ProximityMeter from '../components/proximitymeter';
// Accessories
import AccessoriesGrid from '../components/accessoriesgrid-checkout';
import { accessoryData } from '../Data/data';
// Email js
import emailjs from 'emailjs-com';
// Liability Modal
import LiabilityModal  from '../components/liabilitymodal';

import { payments as SquarePayments } from '@square/web-sdk'; // Correct import

const cpt = ({ data }) => {
    // State to hold form values
    const [formValues, setFormValues] = useState({});
    // State to require form values
    const [isFormValid, setIsFormValid] = useState(false);
    const apiRoute = data.apiRoute;

    // State to hold loading 
    const [loading, setLoading] = useState(false);
    // Water float
    const [waterFloat, setWaterFloat] = useState(false);

    // Show Liability Modal
    const [showLiabilityModal, setShowLiabilityModal] = useState(false);

    // Square variables
    const [payments, setPayments] = useState(null);
    const [card, setCard] = useState(null);

    // Cart Items from Redux
    const cartItems = useSelector((state) => state.cart.items);

    // Use Dispatch for Redux
    const dispatch = useDispatch();

    // Delivery Charge Variable
    const [deliveryCharge, setDeliveryCharge] = useState(null);

    // State to hold card container loading status
    const [isCardLoading, setIsCardLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);

    // Calculate total price
    let totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * (item.quantity || 1), 0);
    totalPrice += deliveryCharge;

    // Date for the accessories grid
    const singleDate = cartItems.length > 0 ? cartItems[0].date : null;

    // Concatenate address components into one string
    //  **** DELETING THE FULLADDRESS VARIABLE CAUSES THE PROXIMITY METER TO BREAK FOR SOME REASON. DO NOT DELETE IT ****
    const fullAddress = `${formValues['Street Address']}, ${formValues['City']}, ${formValues['State']} ${formValues['Zip Code']}`;

    // Use Effect for making sure all fields in form are filled in
    useEffect(() => {
        setIsFormValid(handleValidateForm());
    }, [formValues]); // Re-validate when formValues change

    useEffect(() => {
        if (
            cartItems.some(
                (item) =>
                    item.title === "Wave Rider" ||
                    (item.title === "Tropical Combo Slide" && item.price === 225)
            )
        ) {
            setWaterFloat(true);
        } else {
            setWaterFloat(false);
        }
    }, [cartItems]);

    useEffect(() => {
        console.log("total price: ", Math.round(totalPrice * 100, 2))
    }, [totalPrice]);

    // useEffect(() => {
    //     const setupPayments = async () => {
    //         if (typeof window !== 'undefined' && window.Square) {
    //             try {
    //                 // Initialize payments instance if not already initialized
    //                 const paymentsInstance = window.Square.payments(
    //                     'sandbox-sq0idb-5Nc6RAjZkLqlYcvGAHxnOA', // Sandbox Application ID
    //                     'L82JRJN986YEA' // Sandbox Location ID
    //                 );
    //                 setPayments(paymentsInstance);
    //                 console.log('Payments instance initialized:', paymentsInstance);
    
    //                 // Initialize card instance and attach to DOM
    //                 const cardInstance = await paymentsInstance.card();
    //                 await cardInstance.attach('#card-container');
    //                 setCard(cardInstance);
    //                 console.log('Card instance successfully attached');
    //             } catch (error) {
    //                 console.error('Failed to initialize Square Payments or Card:', error);
    //             }
    //         } else {
    //             console.error('Square Payments SDK is not loaded');
    //         }
    //     };
    
    //     setupPayments();
    // }, []); // Empty dependency array ensures this runs only once on component mount   


    // const setupPayments = async () => {
    //     try {
    //         if (typeof window !== 'undefined' && window.Square) {
    //             const paymentsInstance = window.Square.payments(
    //                 'sandbox-sq0idb-5Nc6RAjZkLqlYcvGAHxnOA', // Application ID
    //                 'L82JRJN986YEA' // Location ID
    //             );
    //             setPayments(paymentsInstance);

    //             // Wait for the card container to be in the DOM
    //             const cardContainer = document.getElementById('card-container');
    //             // const cardContainer = await waitForElement('#card-container');
    //             if (!cardContainer) {
    //                 throw new Error('Card container not found in DOM');
    //             }

    //             const cardInstance = await paymentsInstance.card();
    //             await cardInstance.attach('#card-container'); // Attach to the container
    //             setCard(cardInstance); // Save the card instance for later use
    //             setIsCardLoading(false); // Stop the spinner
    //         } else {
    //             throw new Error('Square Payments SDK not loaded');
    //         }
    //     } catch (error) {
    //         console.error('Failed to initialize Square Payments:', error);
    //         setLoadError(true); // Mark as failed
    //         setIsCardLoading(false); // Stop loading spinner
    //     }
    // };

    const setupPayments = async () => {
        try {
            if (typeof window !== 'undefined' && window.Square) {
                const paymentsInstance = window.Square.payments(
                    'sq0idp-oTOzmovMpsG9qYkW2ydhGQ', // Application ID
                    'L7R68JJEZXTCV' // Location ID
                );
                setPayments(paymentsInstance);
    
                const cardContainer = document.getElementById('card-container');
    
                if (!cardContainer) {
                    throw new Error('Card container not found in DOM');
                }
    
                // Clear the container before reattaching
                cardContainer.innerHTML = '';
    
                const cardInstance = await paymentsInstance.card();
                await cardInstance.attach('#card-container'); // Attach to the container
                setCard(cardInstance); // Save the card instance for later use
                setIsCardLoading(false); // Stop the spinner
            } else {
                throw new Error('Square Payments SDK not loaded');
            }
        } catch (error) {
            console.error('Failed to initialize Square Payments:', error);
            setLoadError(true); // Mark as failed
            setIsCardLoading(false); // Stop loading spinner
        }
    };

    const handleRetry = () => {
        setLoadError(false); // Reset error state
        setIsCardLoading(true); // Show loading spinner again
        setupPayments(); // Retry setup
    };

    useEffect(() => {
        setupPayments();
    }, []);

    // Function to open the modal
    const handleShowModal = () => {
        setShowLiabilityModal(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setShowLiabilityModal(false);
    };

    // Function to proceed with the checkout
    const handleProceedWithCheckout = async () => {
        setShowLiabilityModal(false); // Close the modal
        await fetchBookedFloats(); // Call the original checkout logic
    };

    // Function to send receipt email
    const sendReceiptEmail = (customerName, orderId, totalPrice, toEmail) => {

        let message = cartItems.map((item, index) => {
            return `${index + 1}. ${item.quantity || 1}x ${item.title} - $${(item.price * (item.quantity || 1)).toFixed(2)}`;
        }).join('\n');

        if (deliveryCharge ? message += `\n\n Delivery Charge $${deliveryCharge.toFixed(2)}` : message += "");

        const templateParams = {
            to_name: customerName,  // Matches {{to_name}} in the template
            order_ID: orderId,            // Matches {{date}} in the template
            message: message,      // Matches {{message}} in the template
            total_price: totalPrice.toFixed(2),
            to_email: toEmail,
            reply_to: 'no-reply@joyjumpbounce.com', // Add this line
            from_name: 'Joy Jump Bounce'  // Add this to make it clearer who it's from
        };
    
        emailjs
            .send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, // Replace with your EmailJS service ID
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_RECEIPT_ID, // Replace with your EmailJS template ID
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_USER_ID // Replace with your EmailJS public key
            )
            .then(
                (response) => {
                    console.log('Receipt email sent successfully:', response.status, response.text);
                },
                (error) => {
                    console.error('Error sending receipt email:', error);
                }
            );
    };
    
    // Function to handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    // Callback function to update delivery charge in CheckoutPage
    const handleDeliveryChargeUpdate = (charge) => {
        setDeliveryCharge(charge);
    };

    const handleValidateForm = () => {
        const requiredFields = ["What Time Does Your Event Start?*", "What Time Does Your Event End? ","First Name", "Last Name", "Email", "Grass or Concrete", "Water Hook up Within 100 Feet?", "Power Hook up Within 100 Feet?*", "Street Address", "City", "State", "Zip Code"];
        for (let field of requiredFields) {
            if (!formValues[field] || formValues[field].trim() === "") {
                return false;
            }
        }
        return true;
    }; 

    // // Function to handle the payment process
    // const handlePayment = async () => {
    //     try {
    //         // Check if card instance exists
    //         if (!card) {
    //             console.error("Card instance not initialized.");
    //             alert("Payment setup failed. Please try refreshing the page.");
    //             return { success: false };
    //         }
    
    //         // Tokenize the card details
    //         const result = await card.tokenize();
    
    //         if (result.status === 'OK') {
    //             const paymentToken = result.token;
    
    //             // Send the token to your backend for processing
    //             const response = await fetch('/api/createPayment', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     token: paymentToken,
    //                     firstName: formValues['First Name'],
    //                     lastName: formValues['Last Name'],
    //                     price: Math.round(totalPrice * 100, 2)
    //                 }),
    //             });
    
    //             const paymentResult = await response.json();
    //             return paymentResult;
    //         } else {
    //             console.error('Tokenization failed:', result.errors);
    //             alert('Payment failed. Please check your card details.');
    //             return { success: false };
    //         }
    //     } catch (error) {
    //         console.error('Payment error:', error);
    //         alert('An error occurred during payment.');
    //         return { success: false };
    //     }
    // };
    

    // Function to handle the checkout process
    // const handleCheckout = async () => {
    //     // Generate a unique order ID for this checkout session
    //     const orderId = `Order-${Date.now()}`;
    
    //     // Add form data and order ID to each cart item
    //     const updatedCartItems = cartItems.map((item) => ({
    //         ...item,
    //         orderId,
    //         firstName: formValues['First Name'],
    //         lastName: formValues['Last Name'],
    //         email: formValues['Email'],
    //         setupTime: formValues['What Time Does Your Event Start?*'],
    //         turf: formValues['Grass or Concrete'],
    //         waterHookup: formValues['Water Hook up Within 100 Feet?'],
    //         powerHookup: formValues['Power Hook up Within 100 Feet?*'],
    //         phoneNumber: formValues['Phone Number'],
    //         address: formValues['Street Address'],
    //         city: formValues['City'],
    //         state: formValues['State'],
    //         zipCode: formValues['Zip Code'],
    //     }));
    
    //     // Add an extra row for totals
    //     updatedCartItems.push({
    //         orderId: null,
    //         totalPrice: totalPrice,
    //         deliveryCharge: deliveryCharge,
    //     });
    
    //     try {
    //         // Check if the card instance is ready
    //         if (!card) {
    //             console.error("Card instance is not initialized.");
    //             alert('Payment setup failed. Please refresh the page and try again.');
    //             return;
    //         }
    
    //         // Process the payment
    //         const paymentResult = await handlePayment();
    
    //         if (paymentResult?.success) {
    //             // If payment is successful, send updated cart data to the backend
    //             const response = await fetch(apiRoute, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     cartItems: updatedCartItems,
    //                 }),
    //             });
    
    //             const result = await response.json();
    //             if (response.ok) {
    //                 // Clear the cart
    //                 dispatch(clearCart());
            
    //                 // Send receipt email
    //                 const customerName = `${formValues['First Name']} ${formValues['Last Name']}`;
    //                 const toEmail = `${formValues['Email']}`;
    //                 console.log("customer name: ", customerName);
    //                 console.log("orderID: ", orderId);
    //                 console.log("total price: ", totalPrice);
            
    //                 try {
    //                     await sendReceiptEmail(customerName, orderId, totalPrice, toEmail);
    //                     // Redirect to the success page after the email is sent
    //                     window.location.href = '/checkout-success';
    //                 } catch (error) {
    //                     console.error("Error sending email:", error);
    //                     // Handle the error as needed
    //                 }
    //             }else{
    //                 alert(`Failed to send order data: ${result.message}`);
    //             }
    //         }
    //         // } else {
    //         //     alert('Payment failed. Please try again.');
    //         // }
    //     } catch (error) {
    //         console.error('Error during checkout:', error);
    //         alert('An error occurred during checkout.');
    //     }
    // };    

    const handleCheckout = async () => {
        try {
            // Validate and tokenize the card details only on button click
            if (!card) {
                console.error("Card instance is not initialized.");
                alert('Payment setup failed. Please refresh the page and try again.');
                return;
            }
    
            // Tokenize the card details
            const tokenizationResult = await card.tokenize();
    
            if (tokenizationResult.status !== 'OK') {
                console.error('Card validation failed:', tokenizationResult.errors);
                alert('Invalid card details. Please check your card information and try again.');
                return;
            }
    
            // Proceed with the checkout process if the tokenization succeeds
            const paymentToken = tokenizationResult.token;
    
            // Generate a unique order ID for this checkout session
            const orderId = `Order-${Date.now()}`;
        
            // Add form data and order ID to each cart item
            const updatedCartItems = cartItems.map((item) => ({
                ...item,
                orderId,
                firstName: formValues['First Name'],
                lastName: formValues['Last Name'],
                email: formValues['Email'],
                setupTime: formValues['What Time Does Your Event Start?*'],
                endTime: formValues['What Time Does Your Event Start?*'],
                turf: formValues['Grass or Concrete'],
                waterHookup: formValues['Water Hook up Within 100 Feet?'],
                powerHookup: formValues['Power Hook up Within 100 Feet?*'],
                phoneNumber: formValues['Phone Number'],
                address: formValues['Street Address'],
                city: formValues['City'],
                state: formValues['State'],
                zipCode: formValues['Zip Code'],
            }));
    
            // Add an extra row for totals
            updatedCartItems.push({
                orderId: null,
                totalPrice: totalPrice,
                deliveryCharge: deliveryCharge,
            });
    
            // Process payment
            const response = await fetch('/api/chp-test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: paymentToken, // Use the token from card.tokenize
                    firstName: formValues['First Name'],
                    lastName: formValues['Last Name'],
                    price: Math.round(totalPrice * 100, 2),
                }),
            });
    
            const paymentResult = await response.json();
    
            if (paymentResult?.success) {
                // Send updated cart data to the backend if payment is successful
                const orderResponse = await fetch(apiRoute, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        cartItems: updatedCartItems,
                    }),
                });
    
                const orderResult = await orderResponse.json();
    
                if (orderResponse.ok) {
                    // Clear the cart
                    dispatch(clearCart());
    
                    // Send receipt email
                    const customerName = `${formValues['First Name']} ${formValues['Last Name']}`;
                    const toEmail = `${formValues['Email']}`;
    
                    try {
                        await sendReceiptEmail(customerName, orderId, totalPrice, toEmail);
                        // Redirect to the success page after the email is sent
                        window.location.href = '/checkout-success';
                    } catch (error) {
                        console.error("Error sending email:", error);
                    }
                } else {
                    alert(`Failed to send order data: ${orderResult.message}`);
                }
            } else {
                alert('Payment failed. Please try again.');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('An error occurred during checkout.');
        }
    };    

    const fetchBookedFloats = async () => {
        setLoading(true); // Start spinner
        try {
            const itemsToCheck = cartItems.map((item) => ({
            date: new Date(item.date).toLocaleDateString('en-US'), // Format date
            title: item.title, // Item title
            }));

            const response = await fetch('/api/getBookedFloatsCheckout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemsToCheck }),
            });

            const result = await response.json();

            if (response.ok) {
            const alreadyBooked = itemsToCheck.filter((item) =>
                result.bookedFloats.some(
                (booked) => booked.title === item.title && booked.date === item.date
                )
            );

            if (alreadyBooked.length > 0) {
                alert(
                'One or more of your items has already been booked. Please review your selection.'
                );
                window.location.href = '/booking';
            } else {
                await handleCheckout(); // Proceed to checkout if no floats are booked
            }
            } else {
            console.error('Failed to check booked floats:', result.message);
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        } finally {
            setLoading(false); // Stop spinner
        }
    };

    return (
        <div className="container">
            <div className="checkout-container">
                <div className="container checkout-inner">
                    {data.fields.map((item, idx) => {
                        let inputElement;
                        switch (item.type) {

                            case "time":
                                inputElement = (
                                    <div>
                                        <label>{item.title}</label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            onChange={(e) => setFormValues({ ...formValues, [item.title]: e.target.value })}
                                        />
                                    </div>
                                );
                                break;

                            case "radio":
                                inputElement = (
                                    <div>
                                        {/* Always render "Grass or Concrete" */}
                                        {item.title === "Grass or Concrete" && (
                                            <div>
                                                <label style={{ paddingRight: "10px" }}>{item.title}</label>
                                                {item.options.map((option, optionIdx) => (
                                                    <label
                                                        className='mbl-radio'
                                                        key={optionIdx}
                                                        // style={{ paddingRight: "20px" }}
                                                    >
                                                        <input
                                                            name={item.title}
                                                            type={item.type}
                                                            value={option.value}
                                                            onChange={handleInputChange}
                                                        />
                                                        {option.label}
                                                    </label>
                                                ))}
                                            </div>
                                        )}

                                        {/* Conditionally render "Water Hook up Within 100 Feet?" */}
                                        {waterFloat && item.title === "Water Hook up Within 100 Feet?" && (
                                            <div>
                                                <label style={{ paddingRight: "10px" }}>{item.title}</label>
                                                {item.options.map((option, optionIdx) => (
                                                    <label
                                                        className='mbl-radio'
                                                        key={optionIdx}
                                                        // style={{ paddingRight: "20px" }}
                                                    >
                                                        <input
                                                            name={item.title}
                                                            type={item.type}
                                                            value={option.value}
                                                            onChange={handleInputChange}
                                                        />
                                                        {option.label}
                                                    </label>
                                                ))}
                                            </div>
                                        )}

                                        {/* Always render "Power Hook up Within 100 Feet?*" */}
                                        {item.title === "Power Hook up Within 100 Feet?*" && (
                                            <div>
                                                <label style={{ paddingRight: "10px" }}>{item.title}</label>
                                                {item.options.map((option, optionIdx) => (
                                                    <label
                                                        className='mbl-radio'
                                                        key={optionIdx}
                                                        // style={{ paddingRight: "20px" }}
                                                    >
                                                        <input
                                                            name={item.title}
                                                            type={item.type}
                                                            value={option.value}
                                                            onChange={handleInputChange}
                                                        />
                                                        {option.label}
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                                break;





                            case "text":
                                inputElement = (
                                    <div>
                                        <label>{item.title}</label>
                                        <input
                                            className="form-control"
                                            onBlur={(e) => e.target.placeholder = item.placeholder}
                                            onFocus={(e) => e.target.placeholder = ""}
                                            placeholder={item.placeholder}
                                            type="text"
                                            name={item.title}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                );
                                break;

                            default:
                                inputElement = <p>Unknown input type</p>;
                        }

                        return (
                            <div
                                className="form-group"
                                key={idx}
                            >
                                {/* <label>{item.title}</label> */}
                                {inputElement}
                                {item.message && <large style={{ color: 'red', textDecoration: 'underline' }}>{item.message}</large>}
                            </div>
                        );
                    })}

                    <ProximityMeter
                        street={formValues['Street Address']}
                        city={formValues['City']}
                        state={formValues['State']}
                        zip={formValues['Zip Code']}
                        onUpdateCharge={handleDeliveryChargeUpdate}
                    />

                    <AccessoriesGrid
                        accessoryData={accessoryData}
                        date={singleDate}
                    />

                    <div className='items'>
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.imgSrc} alt={item.title} className="cart-item-image" />
                                <div className="cart-item-info">

                                    {item.quantity > 1 ?
                                        <p className="cart-item-title">{index + 1}. {item.quantity} {item.title}s</p>
                                        :
                                        <p className="cart-item-title">{index + 1}. {item.title}</p>
                                    }
                                    <p className="cart-item-title">Selected Date: {new Date(item.date).toLocaleDateString()}</p>
                                    <p className="cart-item-price">${item.quantity > 1 ? item.price * item.quantity : item.price}</p>
                                    <Button onClick={() => dispatch(removeItemFromCart(item))}>Remove From Cart</Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-total">
                        <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
                    </div>

                    {/* <div id='card-container'></div> */}

                    {/* <div className="container">
                        <div className="checkout-container">
                            <div className="checkout-inner"> */}
                                {/* Card container to always render in the DOM */}
                                    <div
                                    id="card-container"></div>

                                {/* Show loading spinner while initializing */}
                                {isCardLoading && !loadError && (
                                    <div className="loading-container">
                                        <Circles ariaLabel="loading" color="#000" height="40" width="40" />
                                        <p>Payment Details Loading. Please Wait...</p>
                                    </div>
                                )}

                                {/* Show error message if initialization fails */}
                                {loadError && (
                                    <div className="error-container">
                                        <p>Unable to load payment form. Please check your internet connection and try again.</p>
                                        <Button onClick={handleRetry}>Retry</Button>
                                    </div>
                                )}

                                {/* Checkout button */}
                                {!isCardLoading && (
                                    <div className='checkout-button-container'>
                                        <Button
                                            className="checkout-button"
                                            disabled={!isFormValid || cartItems.length === 0 || loading}
                                            onClick={handleShowModal}
                                        >
                                            {loading ? (
                                                <Circles ariaLabel="loading" color="#ffffff" height="24" width="24" />
                                            ) : (
                                                'Complete Checkout'
                                            )}
                                        </Button>
                                    </div>
                                )}

                                {/* Liability Modal */}
                                <LiabilityModal
                                    show={showLiabilityModal}
                                    onClose={handleCloseModal}
                                    onProceed={handleProceedWithCheckout}
                                />
                            {/* </div>
                        </div>
                    </div> */}

                    {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            className="checkout-button"
                            disabled={!isFormValid || cartItems.length === 0 || loading}
                            onClick={fetchBookedFloats}
                            style={{ fontSize: '2em' }}
                        >
                            {loading ? (
                                <Circles ariaLabel="loading" color="#ffffff" height="24" width="24" />
                            ) : (
                                'Complete Checkout'
                            )}
                        </Button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default cpt;