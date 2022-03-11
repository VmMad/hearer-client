import { useContext } from "react"
import { Col, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import eventService from "../../services/events.service"
import "./EventCard.css"


const EventCard = ({ title, description, assistants, _id, loadEvents, assists, owner, image, userAssists, span }) => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const assistEvent = (_id, userId) => {
        eventService
            .attendEvent(_id, userId)
            .then(() => loadEvents())
    }

    return (
        < Col xs={{ span: `${span}` }} style={{ wordWrap: "break-word" }}
            className="eventCard text-center d-grid align-center">
            <img src={image} className='eventCardImage' />
            <div className="eventCardBody">
                <h2>{title}</h2>
                <hr className="whiteHr" />
                <div className="d-flex flex-column justify-content-around">
                    <p>{assistants.length === 1 ? `${assistants.length} Asistente` : `${assistants.length} Asistentes`} </p>
                </div>
                <div className="buttonsColumn d-flex flex-column">
                    <Button variant="info" className="assistButton" onClick={() =>
                        navigate(`/event/${_id}`)}>Ver detalles del evento</Button>
                    {!userAssists ? <Button variant="warning" className="assistButton" onClick={() =>
                        assistEvent(_id, user._id)}>
                        Asistiré</Button> : <Button disabled variant="warning">Ya asistes</Button>}
                    {owner == user._id && <Button variant="warning" className="assistButton" onClick={() =>
                        navigate(`/event/${_id}/edit`)}>
                        Editar</Button>}
                </div>
            </div>
        </Col >
    )
}
export default EventCard