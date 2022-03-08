import "./EventCategoryCard.css"


const EventCategoryCard = ({ name }) => {

    return (
        <div className="eventCategoryCard btn btn-outline-info">
            {name}
        </div>
    )
}
export default EventCategoryCard