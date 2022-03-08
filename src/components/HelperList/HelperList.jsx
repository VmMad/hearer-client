import { Col } from "react-bootstrap"
import ContactsCard from "../Contacts/ContactsCard/ContactsCard"

const HelperList = ({ helpers }) => {

    return (
        <Col>
            {
                helpers.map((elm, index) => {
                    return <ContactsCard {...elm} key={index} />
                })}
        </Col>

    )
}
export default HelperList