import { useContext, useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import ContactsCard from "../../components/Contacts/ContactsCard/ContactsCard"
import { AuthContext } from "../../context/auth.context"
import contactsService from "../../services/contacts.service"

const ContactsList = () => {
    const { user } = useContext(AuthContext)
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        user && loadContactList()
    }, [user])

    const loadContactList = () => {
        contactsService
            .getUserContacts(user.username)
            .then(({ data }) => setContacts(data))
            .catch(err => console.log(err))
    }

    return (
        <>
            <Container>
                <Row>
                    <Col className="mt-2">
                        {contacts.map((element, index) => {
                            return <ContactsCard key={index} {...element} setContacts={setContacts} />
                        })}
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default ContactsList