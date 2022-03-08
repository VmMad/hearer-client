import { Row } from "react-bootstrap"

import FeelingCard from '../FeelingCard/FeelingCard'

const FeelingsList =({feelings})=>{


    return(
        <Row>{
            feelings.map((e, index) => {
                return <FeelingCard feeling={e} key={index} />
            })
        }</Row>
    )
}

export default FeelingsList