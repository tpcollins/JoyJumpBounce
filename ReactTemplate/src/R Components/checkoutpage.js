import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
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
    
    // Cart Items from Redux
    const cartItems = useSelector((state) => state.cart.items);

    // Use Dispatch for Redux
    const dispatch = useDispatch();

    // Delivery Charge Variable
    const [deliveryCharge, setDeliveryCharge] = useState(null);

    // Calculate total price
    let totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * (item.quantity || 1), 0);
    totalPrice += deliveryCharge;

    // Concatenate address components into one string
    //  **** DELETING THE FULLADDRESS VARIABLE CAUSES THE PROXIMITY METER TO BREAK FOR SOME REASON. DO NOT DELETE IT ****
    const fullAddress = `${formValues['Street Address']}, ${formValues['City']}, ${formValues['State']} ${formValues['Zip Code']}`;

    // Use Effect for making sure all fields in form are filled in
    useEffect(() => {
        setIsFormValid(handleValidateForm());
    }, [formValues]); // Re-validate when formValues change

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

    const handleCheckout = async () => {
        // Generate a unique order ID for this checkout session
        const orderId = `Order-${Date.now()}`;

        // Add the form data and order ID to each cart item
        const updatedCartItems = cartItems.map((item) => ({
            ...item,
            orderId: orderId,
            firstName: formValues['First Name'],
            lastName: formValues['Last Name'],
            setupTime: formValues['What Time Does Your Event Start?*'],
            turf: formValues['Grass or Concrete'],
            waterHookup: formValues['Water Hook up Within 100 Feet?'],
            powerHookup: formValues['Power Hook up Within 100 Feet?*'],
            phoneNumber: formValues['Phone Number'], 
            address: formValues['Street Address'],
            city: formValues['City'],
            state: formValues['State'],
            zipCode: formValues['Zip Code']
        }));

        updatedCartItems.push({
            orderId: null, // Leave this null as it's not needed for this row
            firstName: null,
            lastName: null,
            setupTime: null,
            turf: null,
            waterHookup: null,
            powerHookup: null,
            phoneNumber: null,
            address: null,
            city: null,
            state: null,
            zipCode: null,
            inflatable: null,
            price: null,
            totalPrice: totalPrice,
            deliveryCharge: deliveryCharge
        });
        
        // Add an empty row for separation
        updatedCartItems.push({
            isSeparator: true, // Flag to indicate this is a separator row
        });
    
        try {
            const response = await fetch(apiRoute, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartItems: updatedCartItems
                }),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                alert('Data sent to Airtable successfully!');
            } else {
                alert(`Failed to send data: ${result.message}`);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            alert('An error occurred while sending data.');
        }
        dispatch(clearCart());
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

                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                        <Button
                            className="checkout-button"
                            disabled={!isFormValid || cartItems.length === 0}
                            onClick={handleCheckout}
                            style={{
                                fontSize: '2em',
                            }}
                        >
                            Complete Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
