import { useContext, useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import troubleService from "../../services/troubles.service"
import { AuthContext } from "./../../context/auth.context"
import HelperList from "../HelperList/HelperList"
import "./FeelingCard.css"

const FeelingCard = ({ feeling, className, setTroubles, setFeelings, isHelper, userData, setUserData }) => {

    const [viewHelpers, setViewHelpers] = useState(false)
    const { user } = useContext(AuthContext)
    const { _id, description, ownername, helpers, owner } = feeling

    const offerHelp = (troubleId) => {
        troubleService
            .offerHelp(troubleId)
            .then(({ data }) => setTroubles(data))
            .catch(err => console.log(err))
    }

    const handleChange = () => {
        viewHelpers ? setViewHelpers(false) : setViewHelpers(true)
    }
    return (
        <div className={`contactCard ${className ? className : null} mt-3 mb-3`}>
            <span>Posted by: {ownername}</span>
            <hr />
            <span>{description}</span>
            {(window.location.pathname == "/assist" && !isHelper && owner != user._id && !userData?.contacts?.includes(owner)) &&
                <Button onClick={() => {
                    offerHelp(_id)
                }}>Send help offer</Button>

            }
            {feeling.helpers.length > 0 &&
                (user?._id === feeling.owner && !viewHelpers && window.location.pathname != "/home")
                ? <Button onClick={() => handleChange()}>viewHelpers</Button>
                : null
            }
            {(feeling.helpers.length > 0 && viewHelpers === true && window.location.pathname != "/home") ?
                <> <Button onClick={() => handleChange()}>hideHelpers</Button>
                    <HelperList helpers={helpers} setTroubles={setTroubles}
                        setFeelings={setFeelings} /></>
                : null}

            {!feeling.helpers.length && feeling.owner === user?._id ?
                <div className="noHelpers">No tienes solicitudes</div> : null}
        </div>
    )
}

export default FeelingCard