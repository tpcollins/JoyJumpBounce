import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const CheckoutModal = ({
    cartItems,
    openVar,
    setOpenVar,
    data
}) => {

    const [show, setShow] = useState(false);

    const handleModalClose = () =>{
        setShow(false);
        setOpenVar(false);
    }

    useEffect(() => {
        setShow(openVar);
        console.log("show checkout modal", show);
    }, [openVar]);

    return(
        <Modal 
        centered
        onHide={() => {
            setShow(false);
            setOpenVar(false);
        }}
        show={show}>
            <Modal.Header closeButton>
                <Modal.Title>Your Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div key={index}>
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                        </div>
                    ))
                ) : (
                    <p>Your cart is empty!</p>
                )} */}
                {data.fields.map((item, idx) => (
                    <p
                    key={idx}
                    >{item.title}</p>
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
