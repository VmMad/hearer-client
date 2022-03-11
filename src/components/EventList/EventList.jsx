import { Row, Button } from "react-bootstrap"
import EventCard from "../EventCard/EventCard"
import "./EventList.css"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context"

const EventList = ({ events, loadEvents, handlePageUp, handlePageDown }) => {

    const [showEvents, setShowEvents] = useState(false)
    const { user } = useContext(AuthContext)

    if (window.location.pathname == '/home') {
        return (
            <Row className="justify-content-center text-center">
                <span className="mb-3">Eventos recomendados:</span>
                <div className="buttonContainer"><Button className="buttonEvents" onClick={() => setShowEvents(!showEvents)}>{showEvents ? "Ocultar los eventos" : "Mostrar los eventos"}</Button></div>
                {showEvents && <>
                    <div className="buttonContainer"><Button className="buttonEventsPage" onClick={handlePageDown}>-</Button>
                        <Button className="buttonEventsPage" onClick={handlePageUp} >+</Button></div>
                    {events.map((e, index) => {
                        let userAssists = (e.assistants.includes(user?._id))
                        return <EventCard {...e} userAssists={userAssists} key={index} loadEvents={loadEvents} span="5" />
                    })}
                </>}</Row>

        )
    } else {
        return (
            <Row className="justify-content-center">
                {events.map((e, index) => {
                    let userAssists = (e.assistants.includes(user._id))
                    return <EventCard {...e} key={index} loadEvents={loadEvents} span="3" userAssists={userAssists
                    } />
                })}
            </Row>

        )
    }
}
export default EventList