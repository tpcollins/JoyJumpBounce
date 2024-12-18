import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const ErrorModal = ({ errorMessage, openError, setOpenError }) => {
    const [show, setShow] = useState(false);

    const handleModalClose = () => {
        setShow(false);
        setOpenError(false);
    };

    useEffect(() => {
        setShow(openError);
    }, [openError]);

    return (
        <Modal
            centered
            onHide={handleModalClose}
            show={show}
            size="md"
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: '20px', textAlign: 'center' }}>
                    Error
                </Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ textAlign: 'center' }}>
                <p>
                    Multi-day bookings are not available online. <br />
                    We apologize for the inconvenience.
                </p>
                <p>
                    Please give us a call so we can get you the <br />
                    best discount possible at <strong>(205) 861-4553</strong> <br />
                    or visit our&nbsp;
                        <a href="/contactus" style={{ color: '#007bff', textDecoration: 'underline' }}>
                            contact page
                        </a>
                    &nbsp;to send us a message.
                </p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ErrorModal;