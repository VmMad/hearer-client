import axios from 'axios'

class MailService {
    constructor() {
        this.api = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/mail` })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }
            return config
        })
    }

    sendMail= messBody =>{

       
        return this.api.post('/send',messBody)
    }
}



const mailService = new MailService()

export default mailService