// Bootstrap Modal Variables
import { Modal, Button } from 'react-bootstrap';
// React State Variables
import { useState, useEffect } from 'react';
// Redux Variables
import { useSelector } from 'react-redux';

const CheckoutModal = ({
    openVar,
    setOpenVar
}) => {

    // Cart Items from Redux
    const cartItems = useSelector((state) => state.cart.items);

    // Show Modal Variables
    const [show, setShow] = useState(false);

    const handleModalClose = () =>{
        setShow(false);
        setOpenVar(false);
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
                    <div key={index}>
                        <p>{item.title}</p>
                        <p>{item.price}</p>
                    </div>
                ))}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>Close</Button>
                <Button variant="primary">Checkout</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CheckoutModal;
