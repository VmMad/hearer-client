import { useContext, useEffect, useState } from "react"
import troubleService from "../../services/troubles.service"
import { AuthContext } from "./../../context/auth.context"
import HelperList from "../HelperList/HelperList"
import "./FeelingCard.css"
import PostDropDown from "../PostDropdown/PostDropdown"
import userService from "../../services/user.service"

const FeelingCard = ({ feeling, setTroubles, setFeelings, isHelper, userData, setUserData, setEditing, setFeeling, updateList }) => {
    const defaultAnonymous = "https://res.cloudinary.com/dntpphebk/image/upload/v1646728217/146-1468479_my-profile-icon-blank-profile-picture-circle-hd-removebg-preview_gkvvm1.png"
    const [clicked, setClicked] = useState(false)
    const [viewHelpers, setViewHelpers] = useState(false)
    const { user } = useContext(AuthContext)
    const { _id, description, ownername, helpers, owner, createdAt, image, anonymous } = feeling
    const [ownerData, setOwnerData] = useState()

    const getUserOwner = (owner) => {
        userService
            .getUser(owner)
            .then(({ data }) => {
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

    const changeAnonymity = (boolean) => {
        let modifiedFeeling = { ...feeling, anonymous: boolean }
        troubleService
            .modifyTroubles(modifiedFeeling)
            .then(({ data }) => {
                if (window.location.pathname === "/home") {
                    setFeeling(data)
                } else {
                    updateList(data)
                }
            }
            )
            .catch(err => console.log(err))
    }

    const handleChange = () => {
        viewHelpers ? setViewHelpers(false) : setViewHelpers(true)
    }
    return (
        <div className={`contactCard ${window.location.pathname == "/assist" ? "assistPost" : ""} mt-3 mb-3 
        ${window.location.pathname == "/home" ? "postInHome" : ""}
        ${window.location.pathname == "/profile" ? "postInProfile" : ""}`}>
            {ownerData && console.log(ownerData)}
            <PostDropDown feeling={feeling} className={clicked} setTroubles={setTroubles} setFeelings={setFeelings}
                isHelper={isHelper} userData={userData} setUserData={setUserData}
                owner={owner} user={user} offerHelp={offerHelp} _id={_id} viewHelpers={viewHelpers} handleChange={handleChange}
                onClick={() => setClicked(!clicked)} setEditing={setEditing} changeAnonymity={changeAnonymity} />

            <div className="d-flex postCard">
                <img src={!anonymous ? ownerData?.image : defaultAnonymous} className="feelingCardImage" />
                <div className="ml-4">
                    <h5>  {!anonymous ? (ownerData?.username ? ownerData?.username :
                        <span className="red-text">Usuario eliminado</span>) :
                        `Anonymous ${owner === user._id ? "(You)" : ""}`}</h5>
                    <h5 className="date">
                        {createdAt?.split('T')[0].split("-")[2] + "-" + createdAt?.split('T')[0].split("-")[1] + "-" + createdAt?.split('T')[0].split("-")[0]}
                    </h5>
                </div>
            </div>
            <hr />
            <span>{description}</span>
            <img src={image} className="mt-3 postImage" />
            {viewHelpers && <HelperList helpers={helpers} setTroubles={setTroubles}
                setFeelings={setFeelings} />}

        </div>
    )
}

export default FeelingCard