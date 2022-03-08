import { Modal } from 'react-bootstrap'


import MailForm from '../MailForm/MailForm'


const ModalMail = ({ showModal, handleModalClose}) => {

    return (
        <>
            <Modal show={showModal} onHide={handleModalClose} size="md">
                <Modal.Header closeButton>
                    <Modal.Title>Send Mail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MailForm closeModal={handleModalClose} />
                </Modal.Body>
            </Modal>
        </>
    )
}
export default ModalMail