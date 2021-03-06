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

        <Navbar collapseOnSelect expand="xs" variant="dark" className="navbar" >


            <Container className="navbarcont">

                <NavLink to="/" className='logo'>
                    <img src="https://res.cloudinary.com/dntpphebk/image/upload/v1646926963/zyrcwqkpyluqlejy2o3d.png" alt="" className="navImage" />
                </NavLink>
                <Nav className="me-auto flex-row">
                    <NavLink to="/home" className='navText'>Home</NavLink>
                    <NavLink to="/events" className='navText'>Events</NavLink>
                    <NavLink to="/mycontacts" className='navText'>My Contacts</NavLink>
                    {user?.role === 'user' ? null : <NavLink to="/assist" className='navText'>Offer help</NavLink>}
                </Nav>
                <Navbar.Toggle />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="text-end mt-3">
                        {!user?.username ?
                            <>
                                <NavLink to={{}} onClick={() => handleModalOpen2()} className='navText'> Login</NavLink>
                                <NavLink to={{}} onClick={() => handleModalOpen()} className='navText'>Sign Up</NavLink>
                                <ModalAuth handleModalClose={handleModalClose}
                                    handleModalClose2={handleModalClose2}
                                    showModal={showModal} showModal2={showModal2} />
                            </>
                            :
                            <><NavLink to="/profile">Hi, {user?.username}</NavLink>
                                {user?.role !== 'helper' ||
                                    <NavLink to={`/helperprofile/${user?._id}`}>Helper profile</NavLink>}
                                <NavLink to={{}} onClick={() => logOutUser()} className="LogoutButton">Logout</NavLink></>
                        }

                    </Nav>
                </Navbar.Collapse>

            </Container>

        </Navbar>


    )
}
export default NavbarBootstrap