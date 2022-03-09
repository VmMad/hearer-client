import mailService from '../../services/mail.service'
import { Form, Button, Modal } from 'react-bootstrap'
import { useState, useContext } from "react"
import { AuthContext } from "../../context/auth.context"


const MailForm = ({ handleClose }) => {


    const { user } = useContext(AuthContext)

    const [MailForm, setMailForm] = useState({})

    const handleInputChange = e => {
        const { name, value } = e.target
        setMailForm({

            ...MailForm,
            [name]: value,
        })
    }

    function handleSubmit(e) {
        handleClose()
        e.preventDefault()


        mailService
            .sendMail({ ...MailForm, subject: `${user.email}-${MailForm.subject}` })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))

    }

    return (
        <Form onSubmit={handleSubmit} className="container">
            <Form.Group className="mb-3"  >
                <Form.Label>For:</Form.Label>
                <Form.Control type="email" name="email" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>subject</Form.Label>
                <Form.Control type="text" name="subject" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>message</Form.Label>
                <Form.Control type="text" name="message" onChange={handleInputChange} />
            </Form.Group>
            {window.location.pathname == "/mycontacts" ?
                <Modal.Footer>
                    <Button variant="dark" type="submit" size='lg'>Send</Button>
                </Modal.Footer>
                : <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>

                    <Button variant="primary" onClick={handleClose}>
                        Enviar mensaje
                    </Button>
                </Modal.Footer>
            }
        </Form>
    )
}
export default MailForm