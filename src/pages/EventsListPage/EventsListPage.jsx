import { useContext, useEffect, useState } from "react"
import { Col, Row, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import EventCategoryList from "../../components/EventCategoryList/EventCategoryList.jsx"
import EventList from "../../components/EventList/EventList.jsx"
import SearchEvents from "../../components/SearchEvents/SearchEvents.jsx"
import { AuthContext } from "../../context/auth.context.jsx"
import eventsService from "../../services/events.service.js"
import "./EventsListPage.css"


const EventsListPage = () => {
    const [events, setEvent] = useState([])
    const { user } = useContext(AuthContext)

    useEffect(() => {
        user && loadEvents()
    }, [user])

    const loadEvents = () => {
        eventsService
            .getEvents()
            .then(({ data }) => {
                const newData = data.map(elm => {
                    let assists = false
                    if (elm.assistants.includes(user?._id)) {
                        assists = true
                    }
                    return { ...elm, assists }
                })
                setEvent(newData)
            })
            .catch(err => console.log(err))
    }

    const filterByCategory = category => {
        eventsService
            .getCategory(category)
            .then(({ data }) => {
                setEvent(data)
            })
            .catch(err => console.log(err))
    }

    return (
        <Container className="mt-3 eventPage">
            <Link to="/events/create" className="createEvent"> Create an event
                <img className="createEventImg" src="https://res.cloudinary.com/dntpphebk/image/upload/v1646430434/plus_icon_152556_hljhsp.png" />
            </Link>
            <SearchEvents setEvent={setEvent} />

            <Row className="justify-content-start mt-3">
                <Col xs={{ span: 3, offset: 1 }} className="eventCategoryList text-center d-flex flex-column justify-content-center">
                    <EventCategoryList filterByCategory={filterByCategory} />
                </Col>
                <Col xs={{ span: 6, offset: 1 }}>
                    < EventList events={events} loadEvents={loadEvents} />
                </Col>
            </Row>
        </Container>

    )
}
export default EventsListPage