import FeelingsForm from "../../components/feelingsForm/feelingsForm"
import EditFeelingsForm from "../../components/EditFeelingForm/EditFeelingForm"
import troubleService from '../../services/troubles.service'
import FeelingCard from "../../components/FeelingCard/FeelingCard"
import eventsService from "../../services/events.service"
import EventList from "../../components/EventList/EventList"
import { AuthContext } from "../../context/auth.context"
import { useEffect, useState, useContext } from "react"
import { Container, Button } from 'react-bootstrap'
import "./HomePage.css"


const HomePage = () => {

    const { user } = useContext(AuthContext)
    const [feeling, setFeeling] = useState()
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        user && loadFeeling()
    }, [user])

    const loadFeeling = () => {
        troubleService
            .myTrouble()
            .then(({ data }) => setFeeling(data[0]))
    }

    const [page, setPage] = useState(0)
    const handlePageUp = () => { setPage((page) => page += 1) }
    const handlePageDown = () => { setPage((page) => page -= 1) }

    const [events, setEvent] = useState([])
    useEffect(() => loadEvents(), [page])

    const loadEvents = () => {
        eventsService
            .getSomeEvents(page)
            .then(({ data }) => {
                setEvent(data)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container>
            <div className="makeAPostHome mt-5 mb-5">
                <FeelingsForm setFeeling={setFeeling} />
                {!editing && feeling && <FeelingCard feeling={feeling} />}
                <Button onClick={() => setEditing(true)}>editar</Button>
                <Button onClick={handlePageUp} >+</Button>
                <Button onClick={handlePageDown}>-</Button>
                {editing && feeling && <EditFeelingsForm setEditing={setEditing} setFeeling={setFeeling} feeling={feeling} />}
            </div>
            {events && <  EventList events={events} />
            }

        </Container>

    )
}
export default HomePage