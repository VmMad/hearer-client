import { Row } from "react-bootstrap"
import EventCard from "../EventCard/EventCard"
import "./EventList.css"
const EventList = ({ events, loadEvents }) => {
    return (
        <Row>{
            events.map((e, index) => {
                return <EventCard {...e} key={index} loadEvents={loadEvents} />
            })
        }</Row>
    )
}
export default EventList