import { useContext, useState, useEffect } from "react"
import { AuthContext } from "./../../context/auth.context"
import { Form, Button, Container } from "react-bootstrap"
import eventService from "./../../services/events.service"
import "./CreateEventForm.css"
import { useNavigate } from "react-router-dom"
import eventsService from "./../../services/events.service"
import GoogleMaps from "../GoogleMap/GoogleMap"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete"



const CreateEventForm = () => {

    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const [loadmap, setLM] = useState(false)

    useEffect(() => {

        setTimeout(() => setLM(true), 500)

        eventsService
            .getAllCategories()
            .then(({ data }) => setCategories(data))
            .catch(err => console.log(err))
    }, [])

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

    const { title, description, date, schedule, modality, category, createdCategory } = eventData

    const handleFormChange = e => {

        const { name, value, checked } = e.target

        if (name === "assistants" && checked) {
            setEventData({
                ...eventData,
                [name]: user._id
            })
        } else if (name === "assistants" && !checked) {
            setEventData({
                ...eventData,
                [name]: checked,
            })
        } else if (name === "newcategory") {
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
        let setCategory
        if (eventData.newcategory) {
            setCategory = createdCategory
        } else { setCategory = category }
        eventService
            .createEvent({ ...eventData, category: setCategory, location: location })
            .then(() => navigate("/events"))
            .catch(err => console.log(err))
    }


    const [categories, setCategories] = useState([])
    const [coderValue, setCoderValue] = useState(null)
    const [location, setLocation] = useState({ name: '', coordinates: [40.39274993833529, -3.698461840170875] })

    useEffect(() => console.log('HA CAMBIADO EL CODER VALUE -----', coderValue), [coderValue])

    coderValue && geocodeByAddress(coderValue?.value.description)
        .then(results => {
            console.log('SOY EL RESULT', results)

            return getLatLng(results[0])
        })
        .then((response) => {
            console.log('----- SOY EL RESULT ----- ', response)

            setLocation({ name: '', coordinates: [response.lat, response.lng] })
            setCoderValue(null)

        })
        .catch(err => console.log(err))










    return (
        <Container className='createEventForm'>
            <Form onSubmit={handleFormSubmit} formulario={eventData} className='formEvent'>
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
                <Form.Group className="mb-3" controlId="assistants">
                    <Form.Check type="checkbox" label="I'm attending" onChange={e => handleFormChange(e)} name="assistants" />
                </Form.Group>
                <GooglePlacesAutocomplete
                    apiKey={process.env.REACT_APP_GOOGLEMAPS_KEY} selectProps={{ coderValue, onChange: setCoderValue }} />
                {loadmap && <GoogleMaps location={location} setLocation={setLocation} />}
                <Button variant="primary" type="submit" className="editButton">
                    create
                </Button>
            </Form >
        </Container >
    )
}
export default CreateEventForm
