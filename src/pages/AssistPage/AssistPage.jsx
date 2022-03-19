import SearchPosts from "../../components/SearchPosts/SearchPosts"
import troubleService from "../../services/troubles.service"
import { useSearchParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import FeelingCard from "./../../components/FeelingCard/FeelingCard"
import { Container } from "react-bootstrap"
import userService from "../../services/user.service"
import { AuthContext } from "../../context/auth.context"
import "./AssistPage.css"

const AssistPage = () => {

    const [searchParams, setSearchParams] = useSearchParams({})
    const [troubles, setTroubles] = useState([])
    const [userData, setUserData] = useState({})

    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadTroubles()
    }, [searchParams])

    useEffect(() => getUserData(), [user])

    const loadTroubles = () => {
        troubleService
            .getAutosearchTroubles(searchParams)
            .then(({ data }) => setTroubles(data))
            .catch(err => console.log(err))
    }

    const getUserData = () => {
        userService
            .getUserLogged()
            .then(({ data }) => setUserData(data))
            .catch(err => console.log(err))
    }
    const updateList = (updatedFeeling) => {
        const updatedList = troubles.map(elm => {
            if (elm._id === updatedFeeling._id) {
                return updatedFeeling
            } else {
                return elm
            }
        })
        setTroubles(updatedList)
    }

    return (
        <Container className="assistPage">

            <SearchPosts setSearchParams={setSearchParams} loadTroubles={loadTroubles} />
            {troubles && troubles.map((feeling, i) => {

                return <FeelingCard feeling={feeling} key={i} setTroubles={setTroubles}
                    isHelper={feeling.helpers.some(elm => elm._id === user._id)} userData={userData} setUserData={setUserData} updateList={updateList} />
            })}
        </Container>
    )
}
export default AssistPage