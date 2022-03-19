import { Modal } from 'react-bootstrap'
import "./ModalBootstrap.css"

import SignupForm from '../../components/SignupForm/SingupForm'
import LoginForm from '../../components/LoginForm/LoginForm'


const ModalAuth = ({ showModal, showModal2, handleModalClose, handleModalClose2 }) => {

    return (
        <>
            <Modal show={showModal} onHide={handleModalClose} size="lg" className='modalwindow'>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SignupForm closeModal={handleModalClose} />
                </Modal.Body>
            </Modal>

            <Modal show={showModal2} onHide={handleModalClose2} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm closeModal={handleModalClose2} />
                </Modal.Body>
            </Modal>
        </>
    )
}
export default ModalAuth