import axios from 'axios'

const API_URL = 'http://localhost:8080/api/'
export const GET_REQUEST = async (endpoint = '', params = {}) => {
  try {
    axios.defaults.baseURL = API_URL
    const { data } = await axios.get(endpoint, { params }) // TODO - add cache
    return Promise.resolve(data)
  } catch (e) {
    return Promise.reject(e)
  }
}
