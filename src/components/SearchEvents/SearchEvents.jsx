import { useState } from "react"
import { Form } from "react-bootstrap"
import eventsService from "../../services/events.service"

const SearchEvents = ({ setEvent }) => {

    const [page, setPage] = useState(0)

    const updateEvents = e => {
        eventsService
            .getSomeEvents(page, eventTitle)
            .then(({ data }) => {
                setEvent(data)
            })
            .catch(err => console.log(err))
    }

    const [data, setData] = useState({
        eventTitle: ""
    })

    const handleInputSubmit = e => {
        e.preventDefault()
    }

    const handleFormChange = e => {
        const { name, value } = e.target
        setData({
            [name]: value
        })
    }

    const { eventTitle } = data

    return (
        <Form onSubmit={handleInputSubmit}>
            <Form.Group className="mb-3" controlId="events">
                <Form.Label>Search for events...</Form.Label>
                <Form.Control type="text" name="eventTitle" placeholder="Filter by title"
                 onKeyUp={updateEvents} onChange={handleFormChange} value={eventTitle} />
            </Form.Group>
        </Form>
    )
}
export default SearchEvents 