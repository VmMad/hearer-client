import SearchPosts from "../../components/SearchPosts/SearchPosts"
import troubleService from "../../services/troubles.service"
import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import FeelingCard from "./../../components/FeelingCard/FeelingCard"
import { Container } from "react-bootstrap"

const AssistPage = () => {

    const [searchParams, setSearchParams] = useSearchParams({})
    const [troubles, setTroubles] = useState([])

    useEffect(() => {
        loadTroubles()
    }, [searchParams])

    const loadTroubles = () => {
        troubleService
            .getAutosearchTroubles(searchParams)
            .then(({ data }) => setTroubles(data))
            .catch(err => console.log(err))
    }


    return (
        <Container>
            <SearchPosts setSearchParams={setSearchParams} loadTroubles={loadTroubles} />
            {troubles && troubles.map((feeling, i) => {
                return <FeelingCard feeling={feeling} key={i} loadTroubles={loadTroubles} />
            })}
        </Container>
    )
}
export default AssistPage