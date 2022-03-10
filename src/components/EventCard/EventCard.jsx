import { useContext } from "react"
import { Col, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import eventService from "../../services/events.service"



const EventCard = ({ title, description, assistants, location, _id, loadEvents, assists, owner }) => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const assistEvent = (_id, userId) => {
        eventService
            .attendEvent(_id, userId)
            .then(() => loadEvents())
    }

    return (
        < Col xs={5} style={{ wordWrap: "break-word" }}
            className="eventCard text-center">
            <h2>{title}</h2>
            <hr />
            <p>{description}</p>
            <hr />
            <div className="d-flex flex-column justify-content-around">
               
                <p>Location:{location.name}</p>
                <p>{assistants.length} assistants</p>
            </div>
            <Button variant="info" className="assistButton" onClick={() => 
                navigate(`/event/${_id}`)}>View Details</Button>
            {!assists ? <Button variant="warning" className="assistButton" onClick={() => 
                assistEvent(_id, user._id)}>
                Asistiré</Button> : <Button disabled variant="warning">Ya asistes</Button>}
            {owner == user._id && <Button variant="warning" className="assistButton" onClick={() =>
                 navigate(`/event/${_id}/edit`)}>
                Editar</Button>}
        </Col >
    )
}
export default EventCard