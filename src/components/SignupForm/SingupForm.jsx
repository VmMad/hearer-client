import { useState } from "react"
import { Form, Button } from 'react-bootstrap'
import authService from "../../services/auth.service"
import uploadService from '../../services/upload.service'



const SignupForm = ({ closeModal }) => {
    const [userData, setUserData] = useState({
        username: '',
        password: "",
        email: "",
        imageUrl: "https://res.cloudinary.com/dntpphebk/image/upload/v1646728217/146-1468479_my-profile-icon-blank-profile-picture-circle-hd-removebg-preview_gkvvm1.png"
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        authService
            .signup(userData)
            .then(closeModal())
            .catch(err => console.log('ERRORES', err))
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
                setUserData({ ...userData, imageUrl: data.cloudinary_url })
            })
            .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control placeholder="Pick a username!" type="text" onChange={handleInputChange} name="username" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="mac@hearer.com" onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Your password here..." onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" name="profileImg" onChange={uploadProfileImage} />
            </Form.Group>
            <Button variant="dark" type="submit" style={{ width: '100%' }} disabled={loadingImage}>{loadingImage ? 'Wait...' : 'Sign up'}</Button>
        </Form>
    )
}

export default SignupForm