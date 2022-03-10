import { useContext, useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import ContactsCard from "../../components/Contacts/ContactsCard/ContactsCard"
import { AuthContext } from "../../context/auth.context"
import contactsService from "../../services/contacts.service"
import './ContactsListPage.css'
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



            <Container className="contPage">
                <div class="blur">
                <Row className="clist">
                    <Col className="mt-2">
                        {contacts.map((element, index) => {
                            return <ContactsCard key={index} {...element} setContacts={setContacts} />
                        })}
                    </Col>
                </Row>
               { !contacts.length ? <p className="messcont">You dont have any contacts yet</p>:null}
                </div>
            </Container>
        </>
    )
}
export default ContactsList