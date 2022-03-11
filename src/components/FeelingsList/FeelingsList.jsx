import { Row } from "react-bootstrap"

import FeelingCard from '../FeelingCard/FeelingCard'

const FeelingsList = ({ feelings, setFeelings }) => {


    return (
        <Row className="justify-content-center">{
            feelings.map((e, index) => <FeelingCard feeling={e} key={index} setFeelings={setFeelings} />)
        }</Row>
    )
}

export default FeelingsList