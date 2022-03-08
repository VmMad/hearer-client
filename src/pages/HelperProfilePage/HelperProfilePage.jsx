import HelpProfile from "../../components/HelpProfile/HelpProfile"
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm"
import { AuthContext } from '../../context/auth.context'
import { useState, useContext, useEffect } from "react"
import { Button } from 'react-bootstrap'
import { useParams } from "react-router-dom"
import userService from "../../services/user.service"
import ModalMail from "../../components/ModalMail/ModalMail"



const HelperProfilePage = () => {


    const [showModal, setShowModal] = useState(false)
    const handleModalClose = () => setShowModal(false)
    const handleModalOpen = () => setShowModal(true)

    const {user} = useContext(AuthContext)

    const [helper, setHelper] = useState()

     useEffect(() => {
        loadHelper()
    }, [])

    const {id} = useParams()
    
    const loadHelper =()=>{
        userService
            .getUser(id)
            .then(({data}) => {
                setHelper(data)
            })
    }


    const [editing, setEditing] = useState(false)

    return (
        <article>
            {helper && (!editing ?
            <>  <HelpProfile user={helper} />
                <Button onClick={() => setEditing(true)}>editar</Button>
            </> : <EditProfileForm setEditing={setEditing} user={helper} />)}
            {id === user?._id ? null : <Button onClick={() => handleModalOpen()}>contactar</Button>}
            <ModalMail handleModalClose={handleModalClose} showModal={showModal}/>
        </article>

    )
}

export default HelperProfilePage