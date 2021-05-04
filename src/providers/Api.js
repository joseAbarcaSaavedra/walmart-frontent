import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080'
const API_BASEPATH = '/api/'
export const GET_REQUEST = async (endpoint = '', params = {}) => {
  try {
    axios.defaults.baseURL = `${API_URL}${API_BASEPATH}`
    const { data } = await axios.get(endpoint, { params }) // TODO - add cache
    return Promise.resolve(data)
  } catch (e) {
    return Promise.reject({
      error: e,
      message:
        'Problemas al obtener los datos, favor revisar API_URL en las variables de entorno',
    })
  }
}
