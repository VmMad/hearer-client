import { useContext, useEffect, useState } from "react"
import { Button, Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import eventService from "./../../services/events.service"
import LoadingSpinner from "./../LoadingSpinner/LoadingSpinner"
import GoogleMaps from "../GoogleMap/GoogleMap"
import "./EventDetails.css"

const EventDetails = () => {
    const [event, setEvent] = useState()
    const { id } = useParams()
    const { user } = useContext(AuthContext)

    useEffect(() => {
        loadEvent()
    }, [])


    const loadEvent = () => {
        eventService
            .getEvent(id)
            .then(({ data }) => {
                let assists = false
                if (data.assistants.includes(user?._id)) {
                    assists = true
                }
                const newData = { ...data, assists }
                setEvent(newData)
            })

            .catch(err => console.log(err))
    }

    const deleteAssist = () => {
        const assistantsModified = event.assistants.filter(elm => elm != user._id)
        eventService
            .modifyEvent({ ...event, assistants: assistantsModified })
            .then(({ data }) => setEvent(data))
            .catch(err => console.log(err))
    }

    if (event) {
        const { location, title, description, assistants, modality, assists } = event
        return (
            <Container className="eventDetailsPage">
                <Container className="mt-5 eventDetailsCard">
                    {event && <>
                        <h2>{title}</h2>
                        <hr />
                        <div className="eventDetailsBody">
                            <p>Número de asistentes: {assistants.length}</p>
                            <p>Modalidad: {modality}</p>
                        </div>
                        <hr />
                        <div className="mapsContainer d-flex flex-row justify-content-around">
                            <GoogleMaps newHeight={'400px'} newWidth={'400px'} location={location} />
                            <div className="text-center d-flex flex-column justify-content-center"><p>Detalles del evento:</p>
                                <p>{description}</p>
                            </div>
                        </div>
                        {assists && <><Button className="mt-3" variant="danger" onClick={deleteAssist}>No asistir</Button></>}
                    </>
                    }
                </Container>
            </Container>
        )
    }
    else {
        return <LoadingSpinner />
    }

}
export default EventDetails