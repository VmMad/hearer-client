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
                <span className="mb-5">Recomended events:</span>
                <div className="buttonContainer"><Button className="buttonEvents" onClick={() => setShowEvents(!showEvents)}>{showEvents ? "Hide Events" : "Show Events"}</Button></div>
                {showEvents && <>
                    <div className="buttonContainer"><Button className="buttonEventsPage" onClick={handlePageDown}>-</Button>
                        <Button className="buttonEventsPage" onClick={handlePageUp} >+</Button></div>
                    {events.map((e, index) => {
                        let userAssists = (e.assistants.includes(user?._id))
                        return <EventCard {...e} userAssists={userAssists} key={index} loadEvents={loadEvents} />
                    })}
                </>}</Row>

        )
    } else {
        return (
            <Row className="justify-content-center">
                {events.map((e, index) => {

                    return <EventCard {...e} key={index} loadEvents={loadEvents} />
                })}
            </Row>

        )
    }
}
export default EventList