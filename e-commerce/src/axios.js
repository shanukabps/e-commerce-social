import axios from 'axios'



//axios.defaults.headers.common['a-auth-token'] = localStorage.getItem('jwt');
const instance = axios.create({
    baseURL: 'http://localhost:4000'
})

export default instance;