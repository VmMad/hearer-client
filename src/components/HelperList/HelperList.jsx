import { useContext } from "react"
import { Col } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"
import ContactsCard from "../Contacts/ContactsCard/ContactsCard"

const HelperList = ({ helpers }) => {

    const { user } = useContext(AuthContext)

    console.log("tu usuario", user)

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