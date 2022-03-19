import HelpProfile from "../../components/HelpProfile/HelpProfile"
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm"
import { AuthContext } from '../../context/auth.context'
import { useState, useContext, useEffect } from "react"
import { Button } from 'react-bootstrap'
import { useParams } from "react-router-dom"
import userService from "../../services/user.service"
import ModalMail from "../../components/ModalMail/ModalMail"
import "./ProfileCard.css"



const HelperProfilePage = () => {


    const [showModal, setShowModal] = useState(false)
    const handleModalClose = () => setShowModal(false)
    const handleModalOpen = () => setShowModal(true)

    const { user } = useContext(AuthContext)

    const [helper, setHelper] = useState()

    useEffect(() => {
        loadHelper()
    }, [])

    const { id } = useParams()

    const loadHelper = () => {
        userService
            .getUser(id)
            .then(({ data }) => {
                setHelper(data)
            })
    }


    const [editing, setEditing] = useState(false)

    return (
        <article className="profilePage">
            <div className="profileCard">
                {helper && (!editing ?
                    <>
                        <img src={helper?.image} className="profile-img" />
                        <HelpProfile user={helper} />
                        {helper._id == user?._id && <Button onClick={() => setEditing(true)}>Editar</Button>}
                    </> : <EditProfileForm setEditing={setEditing} user={helper} setHelper={setHelper} />)}
                {id === user?._id ? null : <Button onClick={() => handleModalOpen()} className="button-contact">Contactar</Button>}
                <ModalMail handleModalClose={handleModalClose} showModal={showModal} />
            </div>
        </article>

    )
}

export default HelperProfilePage