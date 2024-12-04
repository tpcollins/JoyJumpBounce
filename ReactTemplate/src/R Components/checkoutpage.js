import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Circles } from 'react-loader-spinner';
// Redux Variables
import { removeItemFromCart, clearCart } from '../redux/slices/cartslice';
import { useSelector, useDispatch } from 'react-redux';
// Proximity Meter
import ProximityMeter from '../components/proximitymeter';
// Accessories
import AccessoriesGrid from '../components/accessoriesgrid-checkout';
import { accessoryData } from '../Data/data';

const CheckoutPage = ({ data }) => {
    // State to hold form values
    const [formValues, setFormValues] = useState({});
    // State to require form values
    const [isFormValid, setIsFormValid] = useState(false);
    const apiRoute = data.apiRoute;
    // State to handle already booked floats
    const [alreadyBooked] = useState([]);
    // State to hold loading 
    const [loading, setLoading] = useState(false);
    // Square variables
    const [payments, setPayments] = useState(null);
    const [card, setCard] = useState(null);
    
    // Cart Items from Redux
    const cartItems = useSelector((state) => state.cart.items);

    // Use Dispatch for Redux
    const dispatch = useDispatch();

    // Delivery Charge Variable
    const [deliveryCharge, setDeliveryCharge] = useState(null);

    // Calculate total price
    let totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * (item.quantity || 1), 0);
    totalPrice += deliveryCharge;

    // Card Instance variable for Square
    let cardInstance = null;

    // Concatenate address components into one string
    //  **** DELETING THE FULLADDRESS VARIABLE CAUSES THE PROXIMITY METER TO BREAK FOR SOME REASON. DO NOT DELETE IT ****
    const fullAddress = `${formValues['Street Address']}, ${formValues['City']}, ${formValues['State']} ${formValues['Zip Code']}`;

    // Use Effect for making sure all fields in form are filled in
    useEffect(() => {
        setIsFormValid(handleValidateForm());
    }, [formValues]); // Re-validate when formValues change

    // Initialize Square Payments and Card UI
    useEffect(() => {
        const initializePayments = async () => {
        if (typeof window !== 'undefined' && window.Square) {
            try {
            const paymentsInstance = window.Square.payments(
                'sandbox-sq0idb-5Nc6RAjZkLqlYcvGAHxnOA', // Replace with your Application ID
                'sandbox' // Replace with your Location ID
            );
            setPayments(paymentsInstance);

            const cardInstance = await paymentsInstance.card();
            await cardInstance.attach('#card-container');
            setCard(cardInstance);
            } catch (error) {
            console.error('Failed to initialize Square Payments:', error);
            }
        }
        };

        initializePayments();
    }, []);

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
        const requiredFields = ["First Name", "Last Name", "Street Address", "City", "State", "Zip Code"];
        for (let field of requiredFields) {
            if (!formValues[field] || formValues[field].trim() === "") {
                return false;
            }
        }
        return true;
    };

    // const fetchBookedFloats = async () => {
    //     setLoading(true); // Start spinner
    //     try {
    //       // Prepare items for availability check
    //       const itemsToCheck = cartItems.map((item) => ({
    //         date: new Date(item.date).toLocaleDateString('en-US'), // Format date
    //         title: item.title, // Item title
    //       }));
    
    //       const response = await fetch('/api/getBookedFloatsCheckout', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ itemsToCheck }),
    //       });
    
    //       const result = await response.json();
    
    //       if (response.ok) {
    //         let alreadyBooked = [];
    
    //         // Check for booked items
    //         itemsToCheck.forEach((item) => {
    //           const isBooked = result.bookedFloats.some(
    //             (booked) => booked.title === item.title && booked.date === item.date
    //           );
    
    //           if (isBooked) {
    //             alreadyBooked.push({ title: item.title, date: item.date });
    //           }
    //         });
    
    //         // If any items are already booked, alert the user and redirect to booking page
    //         if (alreadyBooked.length > 0) {
    //           alert('One or more of your items has already been booked. Please review your selection.');
    //           window.location.href = '/booking';
    //         } else {
    //           await handlePayment(); // Proceed to payment if items are available
    //         }
    //       } else {
    //         console.error('Failed to check booked floats:', result.message);
    //       }
    //     } catch (error) {
    //       console.error('Error during fetch:', error);
    //     } finally {
    //       setLoading(false); // Stop spinner
    //     }
    //   };
      
        // Function to initialize the Square Payments card instance
        const initializeCard = async () => {
            try {
            // Initialize the Payments instance
            const payments = Payments('sandbox-application-id', 'sandbox-location-id'); // Replace with Square sandbox Application and Location IDs

            // Initialize the card instance
            const cardInstance = await payments.card();
            await cardInstance.attach('#card-container'); // Attach the card UI to a div with ID 'card-container'

            return cardInstance;
            } catch (error) {
            console.error('Failed to initialize card:', error);
            return null;
            }
        };

        // Function to handle the payment process
        const handlePayment = async (cardInstance) => {
            try {
            // Tokenize the card details to get a payment token (sourceId)
            const result = await cardInstance.tokenize();

            if (result.status === 'OK') {
                const paymentToken = result.token;

                // Send the token to your backend for processing
                const response = await fetch('/api/createPayment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: paymentToken, // Pass the generated sourceId (token)
                    firstName: formValues['First Name'], // Customer first name
                    lastName: formValues['Last Name'], // Customer last name
                    price: totalPrice * 100, // Convert total price to cents (Square expects price in cents)
                }),
                });

                const paymentResult = await response.json();

                return paymentResult;
            } else {
                console.error('Tokenization failed:', result.errors);
                alert('Payment failed. Please check your card details.');
                return { success: false };
            }
            } catch (error) {
            console.error('Payment error:', error);
            alert('An error occurred during payment.');
            return { success: false };
            }
        };

        // Function to handle the checkout process
        const handleCheckout = async () => {
            // Generate a unique order ID for this checkout session
            const orderId = `Order-${Date.now()}`;

            // Add form data and order ID to each cart item
            const updatedCartItems = cartItems.map((item) => ({
            ...item,
            orderId,
            firstName: formValues['First Name'],
            lastName: formValues['Last Name'],
            setupTime: formValues['What Time Does Your Event Start?*'],
            turf: formValues['Grass or Concrete'],
            waterHookup: formValues['Water Hook up Within 100 Feet?'],
            powerHookup: formValues['Power Hook up Within 100 Feet?'],
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

            try {
            // Ensure the card is initialized before payment
            const cardInstance = await initializeCard();

            if (!cardInstance) {
                alert('Card initialization failed. Please try again.');
                return;
            }

            // Process the payment
            const paymentResult = await handlePayment(cardInstance);

            if (paymentResult?.success) {
                // If payment is successful, send updated cart data to the backend
                const response = await fetch(apiRoute, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartItems: updatedCartItems,
                }),
                });

                const result = await response.json();

                if (response.ok) {
                // Clear the cart and redirect to the success page
                dispatch(clearCart());
                window.location.href = '/checkout-success';
                } else {
                alert(`Failed to send order data: ${result.message}`);
                }
            } else {
                alert('Payment failed. Please try again.');
            }
            } catch (error) {
            console.error('Error during checkout:', error);
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
                                    <input
                                        type="time"
                                        className="form-control"
                                        onChange={(e) => setFormValues({ ...formValues, [item.title]: e.target.value })}
                                    />
                                );
                                break;

                            case "radio":
                                inputElement = (
                                    <div>
                                        {item.options.map((option, optionIdx) => (
                                            <label
                                                key={optionIdx}
                                                style={{ paddingRight: "20px" }}
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
                                );
                                break;

                            case "text":
                                inputElement = (
                                    <input
                                        className="form-control"
                                        onBlur={(e) => e.target.placeholder = item.placeholder}
                                        onFocus={(e) => e.target.placeholder = ""}
                                        placeholder={item.placeholder}
                                        type="text"
                                        name={item.title}
                                        onChange={handleInputChange}
                                    />
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
                                <label>{item.title}</label>
                                {inputElement}
                                {item.message && <large style={{ color: 'red', textDecoration: 'underline'}}>{item.message}</large>}
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
                                    <p className="cart-item-price">{item.showPrice}</p>
                                    <Button onClick={() => dispatch(removeItemFromCart(item))}>Remove From Cart</Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-total">
                        <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;