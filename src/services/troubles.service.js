import axios from 'axios'

class TroubleService {

    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/troubles` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getTroubles = (params) => {
        const queries = Object.fromEntries([...params])
        return this.api.get(`/${Object.entries(queries).length !== 0 ? "?" + params : ""}`)
    }

    getAutosearchTroubles = (params) => {
        const queries = Object.fromEntries([...params])
        return this.api.get(`/autosearch${Object.entries(queries).length !== 0 ? "?" + params : ""}`)
    }

    myTrouble = () => {
        return this.api.get("/myTrouble")
    }

    createTrouble = event => {
        return this.api.post("/", event)
    }

    modifyTroubles = e => {
        const { _id } = e
        return this.api.put(`/${_id}`, e)
    }

    deleteTroubles = id => {
        return this.api.delete(`/${id}`)
    }

    getTrouble = id => {
        return this.api.get(`/${id}`)
    }

    offerHelp = (id) => {
        return this.api.put(`/${id}/offerhelp`)
    }
    acceptHelp = idHelper => {
        return this.api.put(`/deleteFromHelperOffers`, { idHelper })
    }

}

const troubleService = new TroubleService()

export default troubleService