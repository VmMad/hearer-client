import ModalAuth from '../../components/ModalBoostrap/ModalBootstrap'
import { Container } from 'react-bootstrap'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context'

const IndexPage = () => {
    const { user } = useContext(AuthContext)

    const [showModal, setShowModal] = useState(false)
    const handleModalClose = () => setShowModal(false)
    const handleModalOpen = () => setShowModal(true)

    const [showModal2, setShowModal2] = useState(false)
    const handleModalClose2 = () => setShowModal2(false)
    const handleModalOpen2 = () => setShowModal2(true)

    return (
        <>{user && <h2>Hola, {user.username}</h2>}
            <h1>Bienvenido a Hearer.
               </h1>
        </>
        // <Container>
        //     <h1><span onClick={() => handleModalOpen()}>sign up</span> </h1>
        //     <h1><span onClick={() => handleModalOpen2()}>log in</span> </h1>
        //     <ModalAuth handleModalClose={handleModalClose} handleModalClose2={handleModalClose2} showModal={showModal} showModal2={showModal2} />
        // </Container>
    )
}
export default IndexPage