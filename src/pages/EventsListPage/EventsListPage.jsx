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
        <Container>
            <div className="categoryContainer d-flex flex-column">
                <div className="filterEvents eventPage">
                    <span>Buscar por categoría...</span>
                    <div className="listContainer">
                        <EventCategoryList filterByCategory={filterByCategory} />
                    </div>
                    {user?.role != 'user' && <Link to="/events/create" className="createEvent"> Crear un evento
                        <img className="createEventImg" src="https://res.cloudinary.com/dntpphebk/image/upload/v1646430434/plus_icon_152556_hljhsp.png" />
                    </Link>}
                    <SearchEvents className="searchBoxMine" setEvent={setEvent} />
                </div>
            </div>
            <Container className="mt-3 ">
                <Row className="justify-content-start mt-3">

                    <Col xs={{ span: 12 }}>
                        < EventList events={events} loadEvents={loadEvents} />
                    </Col>
                </Row>
            </Container>
        </Container>

    )
}
export default EventsListPage