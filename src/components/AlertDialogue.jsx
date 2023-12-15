import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { UserDashboard } from "../Pages/UserDashboard";
import { useNavigate } from "react-router-dom";

export default function AlertDialog(msg, isOpen, onConfirm, onCancel) {

    const [body, setBody] = useState(msg);
    const [showModal, setShowModal] = useState(msg.isOpen);

    const handleConfirm = () => {
        msg.onConfirm && msg.onConfirm();
        setShowModal(false);
    };

    const handleCancel = () => {
        msg.onCancel && msg.onCancel();
        setShowModal(false);
    };

    return (
        <>
            <Modal isOpen={showModal}>
                <ModalHeader>
                    Confirm
                </ModalHeader>
                <ModalBody>
                    {body.msg}
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="danger"
                        outline
                        onClick={handleConfirm}
                    >
                        Yes
                    </Button>
                    {' '}
                    <Button
                        color="success"
                        outline
                        onClick={handleCancel}
                    >
                        No
                    </Button>
                </ModalFooter>
            </Modal>

        </>
    );
}