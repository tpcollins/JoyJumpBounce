import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const CheckoutPage = ({ data }) => {
    // State to hold form values
    const [formValues, setFormValues] = useState({});
    const apiRoute = data.apiRoute;
    const cartItems = useSelector((state) => state.cart.items);

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    useEffect(() => {
        console.log(formValues)
    }, [formValues]);

    const handleCheckout = async () => {
        // Generate a unique order ID for this checkout session
        const orderId = `Order-${Date.now()}`;

        // Add the form data and order ID to each cart item
        const updatedCartItems = cartItems.map((item, index) => ({
            ...item,
            orderId: orderId,
            firstName: formValues['First Name'],
            lastName: formValues['Last Name'],
            setupTime: formValues['Setup Time'],
            turf: formValues['Grass or Concrete'],
            waterHookup: formValues['Water Hook up Within 100 Feet?'],
            powerHookup: formValues['Power Hook up Within 100 Feet?*'],
            phoneNumber: formValues['Phone Number'], 
            address: formValues['Street Address'],
            city: formValues['City'],
            state: formValues['State'],
            zipCode: formValues['Zip Code']
        }));

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
                                {item.message && <small className="form-text text-muted">{item.message}</small>}
                            </div>
                        );
                    })}

                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                        <Button
                            className="checkout-button"
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
