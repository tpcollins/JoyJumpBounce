import { Modal, Button } from 'react-bootstrap';

const CheckoutModal = ({
    cartItems, 
    handleModalOpen,
    show
}) => {

    const [show, setShow] = useState(false);

    const handleModalClose = () =>{
        setShow(false);
    }

    return(
        <Modal show={show} onHide={handleClose} centered>
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
                <p>placeholder</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>Close</Button>
                <Button variant="primary">Checkout</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CheckoutModal;
