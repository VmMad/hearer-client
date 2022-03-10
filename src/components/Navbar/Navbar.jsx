import { useState, useContext } from "react"
import { Navbar, Container, Nav } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import ModalAuth from "../ModalBoostrap/ModalBootstrap"
import "./Navbar.css"


const NavbarBootstrap = () => {

    const [showModal, setShowModal] = useState(false)
    const handleModalClose = () => setShowModal(false)
    const handleModalOpen = () => setShowModal(true)

    const [showModal2, setShowModal2] = useState(false)
    const handleModalClose2 = () => setShowModal2(false)
    const handleModalOpen2 = () => setShowModal2(true)


    const { user, logOutUser } = useContext(AuthContext)

    return (
        <Navbar collapseOnSelect expand="xs" bg="dark" variant="dark" className="navbar">
            <Container className="navbar">
                <NavLink to="/"><Navbar.Brand>Hearer</Navbar.Brand></NavLink>
                <Nav className="me-auto flex-row">
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/events">Events</NavLink>
                    <NavLink to="/mycontacts">My Contacts</NavLink>
                {user?.role === 'user' ? null : <NavLink to="/assist">Offer help</NavLink>}
                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="text-end mt-3">
                        {!user?.username ?
                            <>
                                <NavLink to={{}} onClick={() => handleModalOpen2()}> Login</NavLink>
                                <NavLink to={{}} onClick={() => handleModalOpen()}>Sign Up</NavLink>
                                <ModalAuth handleModalClose={handleModalClose}
                                 handleModalClose2={handleModalClose2} 
                                showModal={showModal} showModal2={showModal2} />
                                 </>
                            :
                            <><NavLink to="/profile">Hi, {user?.username}</NavLink>
                                <NavLink to={{}} onClick={() => logOutUser()}>Logout</NavLink></>
                        }
                        {user?.role !== 'helper' ? null : 
                        <NavLink to={`/helperprofile/${user?._id}`}>Helper profile</NavLink>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default NavbarBootstrap