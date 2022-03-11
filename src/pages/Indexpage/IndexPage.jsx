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
        <Container>
            <h1>Bienvenido a Hearer.</h1>
        </Container>
    )
}
export default IndexPage