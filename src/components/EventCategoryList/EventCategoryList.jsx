import "./EventCategoryList.css"
import { Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import eventsService from "../../services/events.service"
const EventCategoryList = ({ filterByCategory }) => {

    const [categories, setCategories] = useState([])
    useEffect(() => {
        eventsService
            .getAllCategories()
            .then(({ data }) => setCategories( ["Categorias",...data]))
            .catch(err => console.log(err))
    }, [])

    return categories.map((elm, index) => {
        return <Button variant="transparent" className="shadow-none" key={index}
            onClick={() => filterByCategory(elm.toLowerCase())} >{elm}</Button>
    })

}
export default EventCategoryList