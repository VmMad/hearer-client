import { Row } from "react-bootstrap"

import FeelingCard from '../FeelingCard/FeelingCard'

const FeelingsList = ({ feelings }) => {


    return (
        <Row>{
            feelings.map((e, index) => {
                console.log(e)
                return <FeelingCard feeling={e} key={index} />
            })
        }</Row>
    )
}

export default FeelingsList