import axios from 'axios';
import { URLBASE } from '../utils/domain';

export const  clienteAxios = token => axios.create({
    baseURL: `${URLBASE}/api`,
    headers: {
        'Authorization': `bearer ${token}`
    }
})

export const  clienteAxios4 = axios.create({
    baseURL: `${URLBASE}/api`
})

export const clienteAxios2 = axios.create({
    baseURL: `${URLBASE}/oauth`,
    auth: {
        username: 'app',
        password: '12345'
    }
})

export const clienteAxios3 = axios.create({
    baseURL: 'http://localhost:4000',
})