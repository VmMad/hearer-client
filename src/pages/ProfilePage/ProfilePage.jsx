import FeelingsList from "../../components/FeelingsList/FeelingsList"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from '../../context/auth.context'
import troubleService from "../../services/troubles.service"
import { useSearchParams } from "react-router-dom"
import { Container } from "react-bootstrap"

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
    const updateList = (updatedFeeling) => {
        const updatedList = feelings.map(elm => {
            if (elm._id === updatedFeeling._id) {
                return updatedFeeling
            } else {
                return elm
            }
        })
        setFeelings(updatedList)
    }


    return (
        <Container>
            <FeelingsList feelings={feelings} setFeelings={setFeelings} updateList={updateList} />
        </Container>
    )
}
export default ProfilePage