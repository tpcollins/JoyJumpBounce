import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const LiabilityModal = ({ show, onClose, onProceed }) => {
    return (
        <Modal
            centered
            onHide={onClose}
            show={show}
            size="md"
        >
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: '20px', textAlign: 'center' }}>
                    Important Notice
                </Modal.Title>
            </Modal.Header>

            <Modal.Body style={{ textAlign: 'center' }}>
                <p>
                    NOTE: Before setup can occur, liability waivers must be signed. 
                    The person signing must be 21+ and must have identification matching 
                    the name entered on the checkout form.
                </p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onProceed}>
                    Proceed with Checkout
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LiabilityModal;
