import FeelingsList from "../../components/FeelingsList/FeelingsList"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from '../../context/auth.context'
import troubleService from "../../services/troubles.service"
import { useSearchParams } from "react-router-dom"

const ProfilePage = () => {

    const { user } = useContext(AuthContext)
    const [feelings, setFeelings] = useState([])
    const [searchParams, setSearchParams] = useSearchParams({ owner: user?._id })

    useEffect(() => {
        user && loadFeelingsList()
        user && setSearchParams({ owner: user?._id })
    }, [user])

    const loadFeelingsList = () => {
        troubleService
            .getTroubles(searchParams)
            .then(({ data }) => setFeelings(data))
            .catch(err => console.log(err))
    }

    return (
        <FeelingsList feelings={feelings} />
    )
}
export default ProfilePage