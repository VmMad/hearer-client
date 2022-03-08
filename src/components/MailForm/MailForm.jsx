import mailService from '../../services/mail.service'
import { Form, Button } from 'react-bootstrap'
import { useState, useContext } from "react"
import { AuthContext } from "../../context/auth.context"


const MailForm = () => {


    const { user } = useContext(AuthContext)
    console.log(user.email)

    const [MailForm, setMailForm] = useState({})

    const handleInputChange = e => {
        const { name, value } = e.target
        console.log('soy e', e)
        setMailForm({

            ...MailForm,
            [name]: value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault()


        mailService
            .sendMail({ ...MailForm, subject: `${user.email}-${MailForm.subject}` })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))

    }

    return (
        <Form onSubmit={handleSubmit} >
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
            <Button variant="dark" type="submit" style={{ width: '100%' }}>send</Button>
        </Form>
    )
}
export default MailForm