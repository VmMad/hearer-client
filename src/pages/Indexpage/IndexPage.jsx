import { Container } from 'react-bootstrap'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import "./IndexPage.css"

const IndexPage = () => {
    const { user } = useContext(AuthContext)

    const [showModal, setShowModal] = useState(false)
    const handleModalClose = () => setShowModal(false)
    const handleModalOpen = () => setShowModal(true)

    const [showModal2, setShowModal2] = useState(false)
    const handleModalClose2 = () => setShowModal2(false)
    const handleModalOpen2 = () => setShowModal2(true)

    return (
        <Container className='landingPage'>
            <div className="landing-card">
                <h1>Bienvenido a Hearer.</h1>
                <p>La plataforma donde si tienes algo que quieras decir, hay alguien que quiere escucharte.</p>
            </div>
        </Container>
    )
}
export default IndexPage