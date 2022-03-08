import { useState } from "react"
import { Form, Button } from 'react-bootstrap'
import userService from '../../services/user.service'

const EditProfileForm = ({ setEditing, user: { _id, username, email, picture, studies, specialities } }) => {

    const [profileForm, setProfileForm] = useState({
        username: username,
        email: email,
        picture: picture,
        studies: studies,
        specialities: specialities,
    })

    const handleInputChange = e => {

        const { name, value } = e.target
        setProfileForm({
            _id,
            ...profileForm,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        userService
            .editUser({ _id, ...profileForm })
            .then(() => setEditing(false))
            .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>User name</Form.Label>
                <Form.Control type="text" name="username" value={profileForm.username} onChange={handleInputChange} />
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" value={profileForm.email} onChange={handleInputChange} />
                <Form.Label>Picture</Form.Label>
                <Form.Control type="text" name="picture" value={profileForm.picture} onChange={handleInputChange} />
                <Form.Label>Studies</Form.Label>
                <Form.Control type="text" name="studies" value={profileForm.studies} onChange={handleInputChange} />
                <Form.Label>Specialities</Form.Label>
                <Form.Control type="text" name="specialities" value={profileForm.specialities} onChange={handleInputChange} />
            </Form.Group>
            <Button variant="dark" type="submit" style={{ width: '100%' }} >Modify</Button>
        </Form>
    )
}


export default EditProfileForm