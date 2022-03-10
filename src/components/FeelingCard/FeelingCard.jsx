import { useContext, useEffect, useState } from "react"
import troubleService from "../../services/troubles.service"
import { AuthContext } from "./../../context/auth.context"
import HelperList from "../HelperList/HelperList"
import "./FeelingCard.css"
import PostDropDown from "../PostDropdown/PostDropdown"
import userService from "../../services/user.service"

const FeelingCard = ({ feeling, className, setTroubles, setFeelings, isHelper, userData, setUserData, setEditing }) => {

    const [clicked, setClicked] = useState(false)

    const [viewHelpers, setViewHelpers] = useState(false)
    const { user } = useContext(AuthContext)
    const { _id, description, ownername, helpers, owner } = feeling
    const [ownerData, setOwnerData] = useState()

    const getUserOwner = (owner) => {
        userService
            .getUser(owner)
            .then(({ data }) => {
                console.log(data)
                setOwnerData(data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => getUserOwner(owner), [])

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
        <div className={`contactCard ${className ? className : null} mt-3 mb-3 ${window.location.pathname == "/home" && "postInHome"}`}>

            <PostDropDown feeling={feeling} className={clicked} setTroubles={setTroubles} setFeelings={setFeelings}
                isHelper={isHelper} userData={userData} setUserData={setUserData}
                owner={owner} user={user} offerHelp={offerHelp} _id={_id} viewHelpers={viewHelpers} handleChange={handleChange}
                onClick={() => setClicked(!clicked)} setEditing={setEditing} />

            <span className="d-flex postCard"><img src={ownerData?.image} className="feelingCardImage" /> {owner == user?._id ? <h5 className="youText"> {user.username}</h5> : <h5 className="youText"> {ownername}</h5>}</span>

            <hr />

            <span>{description}</span>
            {viewHelpers && <HelperList helpers={helpers} setTroubles={setTroubles}
                setFeelings={setFeelings} />}

        </div>
    )
}

export default FeelingCard