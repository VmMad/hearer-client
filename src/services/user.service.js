import axios from 'axios'

class UserService {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/profile` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getUser = id => {
        return this.api.get(`/${id}`)
    }

    editUser = e => {
        const { _id } = e
        return this.api.put(`/edit/${_id}`, e)
    }

    deleteUser = id => {
        return this.api.delete(`/edit/${id}`)
    }
    acceptHelper = (helper_id) => {
        return this.api.put(`/accepthelper`, { helper_id })
    }

    getUserLogged = () => {
        return this.api.get(`/user`)
    }
}

const userService = new UserService()

export default userService