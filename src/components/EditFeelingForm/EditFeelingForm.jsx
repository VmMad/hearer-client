import { useState, useContext } from "react"
import { Form, Button } from 'react-bootstrap'
import troubleService from '../../services/troubles.service'
import { AuthContext } from '../../context/auth.context'

const EditFeelingsForm = ({ feeling, setFeeling, setEditing }) => {

    const { _id } = feeling
    const { user } = useContext(AuthContext)

    const [feelingsForm, setFeelingsForm] = useState({
        description: feeling.description,
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setFeelingsForm({
            ...feelingsForm,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        troubleService
            .modifyTroubles({
                owner: user._id, _id, ...feelingsForm
            })
            .then(({ data }) => setFeeling(data))
            .then(() => setEditing(false))
            .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mt-5">
                <Form.Label>Edit Post</Form.Label>
                <Form.Control type="text" name="description" value={feelingsForm.description} onChange={handleInputChange} />
            </Form.Group>
            <Button variant="dark" type="submit" style={{ width: '100%' }}>Edit</Button>
        </Form >
    )
}

export default EditFeelingsForm