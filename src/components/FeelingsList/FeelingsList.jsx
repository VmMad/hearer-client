import { Row } from "react-bootstrap"

import FeelingCard from '../FeelingCard/FeelingCard'

const FeelingsList = ({ feelings, setFeelings, updateList }) => {

    return (
        <Row className="justify-content-center">{
            feelings.map((e, index) => <FeelingCard feeling={e} key={index} setFeelings={setFeelings} updateList={updateList} />)
        }</Row>
    )
}

export default FeelingsList