import "./ContactsCard.css"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import userService from "../../../services/user.service"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/auth.context"
import contactsService from "../../../services/contacts.service"


const ContactsCard = ({ username, email, _id, role, setContacts }) => {

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
        console.log(_id)
        userService
            .acceptHelper(_id)
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
    }

    const deleteContact = (userToDelete) => {
        contactsService
            .deleteContact(userToDelete)
            .then(({ data }) => setContacts(data))
            .catch(err => console.log(err))
    }

    return (
        <div className="contactCard mt-3">
            <span>{username}</span>
            <span>{email}</span>

            {(!showButton && window.location.pathname != "/mycontacts") ?
                <Button variant="warning" className="btn-accepthelp" onClick={() => {
                    setShowButton(!showButton)
                    acceptHelp(_id)
                }}>Aceptar ayuda</Button> :
                <Button variant="warning" className="btn-eliminar-contacto" onClick={() => {
                    setShowButton(!showButton)
                    deleteContact(user.username, _id)
                }}>Delete</Button>}
            {role === 'helper' ? <Button onClick={() => navigate(`/helperprofile/${_id}`)}>credentials</Button> :
                <Button>send message</Button>
            }
        </div>
    )
}
export default ContactsCard