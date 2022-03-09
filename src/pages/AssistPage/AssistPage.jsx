import SearchPosts from "../../components/SearchPosts/SearchPosts"
import troubleService from "../../services/troubles.service"
import { useSearchParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import FeelingCard from "./../../components/FeelingCard/FeelingCard"
import { Container } from "react-bootstrap"
import userService from "../../services/user.service"
import { AuthContext } from "../../context/auth.context"

const AssistPage = () => {

    const [searchParams, setSearchParams] = useSearchParams({})
    const [troubles, setTroubles] = useState([])
    const [userData, setUserData] = useState({})


    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadTroubles()
    }, [searchParams])

    useEffect(() => getUserData(user?._id), [])

    const loadTroubles = () => {
        troubleService
            .getAutosearchTroubles(searchParams)
            .then(({ data }) => setTroubles(data))
            .catch(err => console.log(err))
    }

    const getUserData = (_id) => {
        userService
            .getUser(_id)
            .then(({ data }) => setUserData(data))
            .catch(err => console.log(err))
    }


    return (
        <Container>
            <SearchPosts setSearchParams={setSearchParams} loadTroubles={loadTroubles} />
            {troubles && troubles.map((feeling, i) => {
                return <FeelingCard feeling={feeling} key={i} />
            })}
        </Container>
    )
}
export default AssistPage