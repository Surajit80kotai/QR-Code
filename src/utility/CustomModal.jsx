import React from 'react';
import { Button, Modal } from 'react-bootstrap';


const CustomModal = ({ isOpen, onRequestClose, onConfirm, message }) => {
    return (
        <>
            <Modal show={isOpen} onHide={onRequestClose}>
                <Modal.Header>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{message}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onRequestClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CustomModal