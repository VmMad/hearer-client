import axios from 'axios'

class EventService {

    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/events` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getEvents = () => {
        return this.api.get("/")
    }

    getCategory = category => {
        return this.api.get(`/category/${category}`)
    }

    getAllCategories = () => {
        return this.api.get("/categories/all")
    }

    getSomeEvents = (page, data) => {
        return this.api.get(`/?page=${page}&title=${data ? data : ""}`,)

    }

    createEvent = event => {
        return this.api.post("/", event)
    }

    modifyEvent = e => {
        const { _id } = e
        return this.api.put(`/${_id}`, e)
    }

    deleteEvent = id => {
        return this.api.delete(`/${id}`)
    }

    getEvent = id => {
        return this.api.get(`/${id}`)
    }
    attendEvent = (_id, userId) => {
        return this.api.put(`/${_id}/attend`, { userId })
    }
}

const eventsService = new EventService()

export default eventsService
