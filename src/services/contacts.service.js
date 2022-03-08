import axios from 'axios'

class ContactsService {

    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/contacts` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getUserContacts = username => {
        return this.api.get(`/${username}/contacts`)
    }

    deleteContact = (id) => {
        return this.api.post(`/contacts/${id}`)
    }


}

const contactsService = new ContactsService()

export default contactsService