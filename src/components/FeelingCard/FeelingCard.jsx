import { useContext, useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import troubleService from "../../services/troubles.service"
import { AuthContext } from "./../../context/auth.context"
import HelperList from "../HelperList/HelperList"

const FeelingCard = ({ feeling, className }) => {

    const [viewHelpers, setViewHelpers] = useState(false)
    const { user, isLoading } = useContext(AuthContext)
    const { _id, description, ownername, helpers } = feeling

    const navigate = useNavigate()

    const offerHelp = (troubleId, userId) => {
        troubleService
            .offerHelp(troubleId, userId)
            .then(() => navigate("/assist"))
    }
    const [isHelper, setIsHelper] = useState(false)

    useEffect(() => {
        if (helpers.includes(user?._id)) {
            setIsHelper(true)
        }
    }, [user])

    const handleChange = () => {
        viewHelpers ? setViewHelpers(false) : setViewHelpers(true)
    }

    return (
        <div className={`contactCard ${className ? className : null} mt-3 mb-3`}>
            <span>Posted by: {ownername}</span>
            <hr />
            <span>{description}</span>
            {!isLoading && (window.location.pathname === "/assist" && !isHelper && feeling.owner !== user?._id) ?
                <Button onClick={() => {
                    setIsHelper(true)
                    offerHelp(_id, user._id)
                }}>Send help offer</Button>
                : null
            }
            {user?.username === feeling.ownername && !viewHelpers ? <Button onClick={() => handleChange()}>viewHelpers</Button>
                : null
            }
            {viewHelpers === true ? <> <Button onClick={() => handleChange()}>hideHelpers</Button>
                <HelperList helpers={helpers} /></> : null}
        </div>
    )
}

export default FeelingCard