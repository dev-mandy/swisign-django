import axios from 'axios'

const BASE_URL = 'http://localhost:8000/swisign'

const defaultApi = (url, options) => {
    return axios.create({baseURL: url, ...options})
}

export const defaultInstance = defaultApi(BASE_URL)