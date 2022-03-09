import { useState } from "react"
import { Form, Button } from 'react-bootstrap'
import uploadService from "../../services/upload.service"
import userService from '../../services/user.service'

const EditProfileForm = ({ setEditing, setHelper, user: { _id, username, email, image, studies, specialities } }) => {

    const [profileForm, setProfileForm] = useState({
        username: username,
        email: email,
        image: image,
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
            .then(({ data }) => {
                setHelper(data)
                setEditing(false)
            })
            .catch(err => console.log(err))
    }


    const [loadingImage, setLoadingImage] = useState(false)

    const uploadProfileImage = e => {

        setLoadingImage(true)

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        uploadService
            .uploadImage(uploadData)
            .then(({ data }) => {
                setLoadingImage(false)
                setProfileForm({ ...profileForm, image: data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>User name</Form.Label>
                <Form.Control type="text" name="username" value={profileForm.username} onChange={handleInputChange} />
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" value={profileForm.email} onChange={handleInputChange} />
                <Form.Group className="mb-3">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control type="file" name="image" onChange={uploadProfileImage} />
                </Form.Group>
                <Form.Label>Studies</Form.Label>
                <Form.Control type="text" name="studies" value={profileForm.studies} onChange={handleInputChange} />
                <Form.Label>Specialities</Form.Label>
                <Form.Control type="text" name="specialities" value={profileForm.specialities} onChange={handleInputChange} />
            </Form.Group>
            <Button variant="dark" type="submit" style={{ width: '100%' }} disabled={loadingImage}>{loadingImage ? 'Wait...' : 'Edit'}</Button>
        </Form>
    )
}


export default EditProfileForm