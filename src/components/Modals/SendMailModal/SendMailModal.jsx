import MailForm from "../../MailForm/MailForm"
import { Modal } from "react-bootstrap"


const SendMailModal = ({ handleClose, show }) => {

    return (

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Enviar mensaje</Modal.Title>
            </Modal.Header>
            <MailForm handleClose={handleClose} />
        </Modal>

    )
}


export default SendMailModal