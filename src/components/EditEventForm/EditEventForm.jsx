import { Form, Container, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import eventsService from "../../services/events.service"
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"

const EditEventForm = () => {

    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        date: "",
        schedule: "",
        modality: "Presential",
        assistants: undefined,
        coordinates: "",
        category: "General",
        newcategory: false,
        createdCategory: ""
    })

    const { id } = useParams()
    const { title, description, date, schedule, modality, category, createdCategory } = eventData

    const handleFormChange = e => {

        const { name, value, checked } = e.target
        if (name === "newcategory") {
            setEventData({
                ...eventData,
                [name]: value,
                "newcategory": checked
            })
        } else {
            setEventData({
                ...eventData,
                [name]: value,

            })
        }
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        // let setCategory = eventData.newcategory ? createdCategory : category
        let setCategory
        if (eventData.newcategory) {
            setCategory = createdCategory
        } else { setCategory = category }
        eventsService
            .modifyEvent({ ...eventData, category: setCategory })
            .then(() => navigate("/events"))
            .catch(err => console.log(err))
    }


    const [categories, setCategories] = useState([])

    const getCategories = () => {
        eventsService
            .getAllCategories()
            .then(({ data }) => {
                setCategories(data)
            })
            .catch(err => console.log(err))

    }
    const getEventData = () => {
        eventsService
            .getEvent(id)
            .then(({ data }) => {
                const newData = { ...data, createdCategory: "", date: data.date.toLocaleString('en-US').split('+')[1].split('T')[0] }
                setEventData(newData)
            })
            .catch(err => console.log(err))

    }

    useEffect(() => {
        getEventData()
        getCategories()

    }, [])


    return (
        <Container>
            <Form onSubmit={handleFormSubmit} formulario={eventData}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Event Title:</Form.Label>
                    <Form.Control type="text" name="title" value={title} placeholder="Title" onChange={e => handleFormChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control name="description" type="text" value={description} placeholder="Description" onChange={e => handleFormChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Date:</Form.Label>
                    <Form.Control name="date" type="date" value={date} placeholder="Date" onChange={e => handleFormChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="schedule">
                    <Form.Label>Schedule:</Form.Label>
                    <Form.Control name="schedule" type="text" value={schedule} placeholder="From 13:00 to 16:00" onChange={e => handleFormChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="modality">
                    <Form.Label>Modality:</Form.Label>
                    <Form.Select aria-label="Modality" value={modality} onChange={e => handleFormChange(e)} name="modality">
                        <option value="Presential" name="modality" >Presential</option>
                        <option value="Online" name="modality">Online</option>
                        <option value="Hybrid" name="modality">Hybrid</option>
                    </Form.Select>
                </Form.Group>
                {!eventData.newcategory ?
                    <Form.Group className="mb-3" controlId="modality">
                        <Form.Label>Category:</Form.Label>
                        <Form.Select aria-label="Category" value={category} onChange={e => handleFormChange(e)} name="category">
                            {categories && categories.map((e, index) => { return <option key={index} value={e} name="category" >{e}</option> })}
                        </Form.Select>
                    </Form.Group> :
                    <Form.Group className="mb-3" controlId="createdCategory">
                        <Form.Label>Create a category</Form.Label>
                        <Form.Control name="createdCategory" type="text" value={createdCategory} onChange={e => handleFormChange(e)} />
                    </Form.Group>
                }
                <Form.Group className="mb-3" controlId="newcategory">
                    <Form.Check type="checkbox" label="New category" onChange={e => handleFormChange(e)} name="newcategory" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form >
        </Container >
    )
}
export default EditEventForm