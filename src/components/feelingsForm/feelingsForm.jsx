import { useState, useContext } from "react"
import { Form, Button } from 'react-bootstrap'
import troubleService from '../../services/troubles.service'
import { AuthContext } from '../../context/auth.context'

const FeelingsForm = ({ setFeeling }) => {

    const { user } = useContext(AuthContext)

    const [FeelingsForm, setFeelingsForm] = useState({
        description: "",
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setFeelingsForm({

            ...FeelingsForm,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        const { username, _id } = user
        troubleService
            .createTrouble({
                ownername: username,
                owner: _id,
                ...FeelingsForm
            })
            .then((resp) => setFeeling(resp.data))
    }

    return (
        <Form onSubmit={handleSubmit} className="mb-3">
            <Form.Group>
                <Form.Label className="HowDoYouFeel">How do you feel today?</Form.Label>
                <Form.Control type="text" name="description" onChange={handleInputChange} />
            </Form.Group>
            <Button variant="dark" type="submit" style={{ width: '100%' }}>Post</Button>
        </Form>
    )
}

export default FeelingsForm