import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export const ModalAlert = ({title, content, show, setShow}) => {
    return (
        <Modal size="lg"
               aria-labelledby="contained-modal-title-vcenter"
               centered
               show={show}
               backdrop="static" keyboard={true}
        >
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}