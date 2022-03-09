import { Col } from "react-bootstrap"
import ContactsCard from "../Contacts/ContactsCard/ContactsCard"

const HelperList = ({ helpers, setTroubles, setFeelings }) => {

    return (
        <Col>
            {
                helpers.map((elm, index) => {
                    return <ContactsCard {...elm} key={index} setTroubles={setTroubles
                    } setFeelings={setFeelings} />
                })}
        </Col>

    )
}
export default HelperList