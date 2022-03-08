import "./ContactsCard.css"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import userService from "../../../services/user.service"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/auth.context"
import contactsService from "../../../services/contacts.service"


const ContactsCard = ({ username, email, _id, role }) => {

    const navigate = useNavigate()
    console.log('aaaaaaaaaaaa')

    const { user } = useContext(AuthContext)
    const [userLoggedData, setUserLoggedData] = useState()
    const [showButton, setShowButton] = useState(true)

    const getUserData = () => {
        userService
            .getUser(user?._id)
            .then(({ data }) => setUserLoggedData(data))
            .catch(err => console.log(err))
    }

    useEffect(() => user && getUserData(), [user])


    const acceptHelp = () => {
        userService
            .acceptHelper(user._id, _id)
            .then(({ data }) => console.log(data))
            .catch(err => console.log(err))
    }

    const deleteContact = (loggedUsername, userToDelete) => {
        contactsService
            .deleteContact(userToDelete)
            .then(({ data }) => console.log(data))
            .catch(err => console.log(err))
    }


    return (
        <div className="contactCard">
            <span>{username}</span>
            <span>{email}</span>

            {userLoggedData && ((userLoggedData.contacts.includes(_id) && showButton) ||
                <Button variant="warning" className="btn-eliminar-contacto" onClick={() => {
                    setShowButton(false)
                    console.log(showButton)
                    acceptHelp(user.username, _id)
                }}>Aceptar ayuda</Button>)}

            <Button variant="warning" className="btn-eliminar-contacto" onClick={() => {
                deleteContact(user.username, _id)
            }
            }>Delete</Button>
            {role === 'helper' ? <Button onClick={() => navigate(`/helperprofile/${_id}`)}>credentials</Button> :
                <Button>send message</Button>
            }
        </div>
    )
}
export default ContactsCard