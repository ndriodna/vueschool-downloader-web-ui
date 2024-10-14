import router from '@/router'
import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 0,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
})
api.interceptors.request.use((config) => {
    config.headers['token_client'] = $cookies.get('token_client')
    return config
}, (err) => {
    return Promise.reject(err)
})

api.interceptors.response.use((res) => res, (err) => {
    if (err.response.status == 401 || err.response.status == 404) {
        $cookies.remove('token_client')
        router.push({ name: 'login' })
    }
})

export default api