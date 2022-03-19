import { useState, useContext } from "react"
import { Form, Button } from 'react-bootstrap'
import troubleService from '../../services/troubles.service'
import { AuthContext } from '../../context/auth.context'
import "./FeelingsForm.css"
import uploadService from "../../services/upload.service"

const FeelingsForm = ({ setFeeling }) => {

    const { user } = useContext(AuthContext)
    const [loadingImage, setLoadingImage] = useState(false)
    const [uploadMessage, setUploadMessage] = useState()

    const [FeelingsForm, setFeelingsForm] = useState({
        description: "",
        image: "",
        anonymous: false
    })

    const handleInputChange = e => {
        const { name, value, checked } = e.target
        setFeelingsForm({
            ...FeelingsForm,
            [name]: value,
            ["anonymous"]: checked
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
            .then(() => setFeelingsForm())
            .catch(err => console.log(err))
    }

    const uploadProfileImage = e => {

        setLoadingImage(true)

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        uploadService
            .uploadImage(uploadData)
            .then(({ data }) => {
                setLoadingImage(false)
                setFeelingsForm({ ...FeelingsForm, image: data.cloudinary_url })
                setUploadMessage("Imagen subida correctamente")
                setTimeout(() => setUploadMessage(undefined), 2000)
            })
            .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={handleSubmit} className="mb-3">
            <Form.Group>
                <Form.Control type="text" name="description" onChange={handleInputChange} placeholder="Cómo te sientes hoy?" autoComplete="off" className="createPost" />
            </Form.Group>
            <div className="buttonsPost">
                {uploadMessage && <p className="upload-successful">{uploadMessage}</p>}
                <Form.Group className=" anonymous-check" controlId="anonymous-post">
                    <Form.Check type="checkbox" label="Postear como anónimo?" onChange={e => handleInputChange(e)} name="anonymous" />
                </Form.Group>
                <Button variant="transparent" className="buttonUploadImage image-upload">
                    <label htmlFor="file-input">
                        <img src="https://res.cloudinary.com/dntpphebk/image/upload/v1646951795/icons8-image-64_xjhsso.png" className="uploadImage" />
                    </label>
                    <input id="file-input" type="file" onChange={uploadProfileImage} />
                </Button>
                <Button variant="dark" type="submit" className="buttonPost" disabled={loadingImage}>{loadingImage ? 'Espera...' : 'Postear'}</Button>

            </div>
        </Form>
    )
}

export default FeelingsForm