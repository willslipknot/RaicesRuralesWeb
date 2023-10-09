import axios from 'axios'

const instance = axios.create({
    baseURL:'http://localhost:3001',
    withCredentials:true,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
})

export default instance