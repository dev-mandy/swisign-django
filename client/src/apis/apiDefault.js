import axios from 'axios'

const defaultApi = () => {
    return axios.create({proxy: false})
}

export const defaultInstance = defaultApi()