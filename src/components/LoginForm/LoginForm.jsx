import { useState, useContext } from "react"
import { Form, Button } from 'react-bootstrap'
import authService from '../../services/auth.service'
import { AuthContext } from "../../context/auth.context"
import { useNavigate } from "react-router-dom"
import { MessageContext } from "../../context/userMessage.context"
import "./LoginForm.css"

const LoginForm = ({ closeModal }) => {

    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState()

    const [loginForm, setLoginForm] = useState({
        password: "",
        email: ""
    })

    const { showMessage, setShowMessage, messageInfo, setMessageInfo } = useContext(MessageContext)
    const { storeToken, authUser } = useContext(AuthContext)

    const handleInputChange = e => {
        const { name, value } = e.target
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }

    function handleSubmit(e) {

        e.preventDefault()

        authService
            .login(loginForm)
            .then(({ data }) => {
                storeToken(data.authToken)
                authUser()
                if (window.location.pathname !== "/login") {
                    closeModal()
                    // setMessageInfo(null)
                } else {
                    navigate("/")
                    // setMessageInfo(null)
                }
            })
            .catch(({ response: { data: { message } } }) => {
                setErrorMessage(message)
                setTimeout(() => setErrorMessage(undefined), 4500)
            })
    }


    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" onChange={handleInputChange} />
            </Form.Group>
            <Button variant="dark" type="submit" style={{ width: '100%' }}>Sign in</Button>
            {errorMessage && <div className="authError">{errorMessage}</div>}
            {messageInfo.title && <div className="authError">{messageInfo}</div>}
        </Form>
    )
}

export default LoginForm