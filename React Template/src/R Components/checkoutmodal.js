// Bootstrap Modal Variables
import { Modal, Button } from 'react-bootstrap';
// React State Variables
import { useState, useEffect } from 'react';
// Redux Variables
import { useSelector, useDispatch  } from 'react-redux';
import { clearCart, removeItemFromCart } from '../redux/slices/cartslice';
// Link
import Link from 'next/link';

const CheckoutModal = ({
    openVar,
    setOpenVar
}) => {

    // Cart Items from Redux
    const cartItems = useSelector((state) => state.cart.items);

    // Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

    // Show Modal Variables
    const [show, setShow] = useState(false);

    // Use Dispatch for Redux
    const dispatch = useDispatch();

    const handleModalClose = () =>{
        setShow(false);
        setOpenVar(false);
    }
      
    const showCartItems = () => {
        console.log("Cart Items: ", cartItems);
    }

    useEffect(() => {
        setShow(openVar);
    }, [openVar]);

    return(
        <Modal 
        centered
        onHide={() => {
            setShow(false);
            setOpenVar(false);
        }}
        show={show}
        size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title
                style={{fontSize: '25px'}}
                >Your Cart</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                    <img src={item.imgSrc} alt={item.title} className="cart-item-image" />
                    <div className="cart-item-info">
                        <p className="cart-item-title">{index + 1}. {item.title}</p>
                        <p className="cart-item-title">Selected Date: {new Date(item.date).toLocaleDateString()}</p>
                        <p className="cart-item-price">{item.showPrice}</p>
                        <Button onClick={() => dispatch(removeItemFromCart(item))}>Remove From Cart</Button>
                    </div>
                </div>
            ))}
            {/* <hr className="separator-line" /> */}
            <div className="cart-total">
                <p><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>
            </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>Close</Button>
                <Button variant="secondary" onClick={() => dispatch(clearCart())}>Clear Cart</Button>
                
                <Link href="/checkout">
                    <Button className="checkout-button">
                        Checkout
                    </Button>
                </Link>
            </Modal.Footer>
        </Modal>
    );
};

export default CheckoutModal;
