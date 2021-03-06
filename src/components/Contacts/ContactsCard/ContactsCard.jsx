import "./ContactsCard.css"
import { useNavigate } from "react-router-dom"
import userService from "../../../services/user.service"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/auth.context"
import contactsService from "../../../services/contacts.service"
import troubleService from "./../../../services/troubles.service"
import SendMailModal from "../../Modals/SendMailModal/SendMailModal"
import ContactDropdown from "../../ContactDropdown/ContactDropdown"


const ContactsCard = ({ username, email, _id, role, setContacts, setTroubles, setFeelings }) => {

    const navigate = useNavigate()

    const { user } = useContext(AuthContext)
    const [userLoggedData, setUserLoggedData] = useState()
    const [showButton, setShowButton] = useState(userLoggedData?.contacts.includes(_id))

    const getUserData = () => {
        userService
            .getUser(user?._id)
            .then(({ data }) => setUserLoggedData(data))
            .catch(err => console.log(err))
    }

    useEffect(() => user && getUserData(), [user])


    const acceptHelp = (_id) => {

        userService
            .acceptHelper(_id)
            .then(() => troubleService.acceptHelp(_id))
            .then(({ data }) => {
                if (window.location.pathname == "/assist") {
                    setTroubles(data)
                } else {
                    setFeelings(data.filter(elm => elm.owner == user._id))
                }
            })
    }

    const deleteContact = (userToDelete) => {
        contactsService
            .deleteContact(userToDelete)
            .then(({ data }) => {
                if (window.location.pathname == "/assist" || window.location.pathname == "/mycontacts") {
                    setContacts(data)
                } else {
                    return null
                }
            })
            .catch(err => console.log(err))
    }

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)



    return (
        <div className="contactCard contactList mt-3">
            <ContactDropdown showButton={showButton} setShowButton={setShowButton}
                acceptHelp={acceptHelp} _id={_id} deleteContact={deleteContact} role={role} navigate={navigate}
                setShow={setShow} />
            <div className="contactCardUserData">
                <span >{username}</span>
                <span className="date">{email}</span>
            </div>
            <SendMailModal handleClose={handleClose} show={show} />
        </div >
    )
}
export default ContactsCard