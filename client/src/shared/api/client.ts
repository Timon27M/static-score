import axios from 'axios';

axios.defaults.withCredentials = true;

const NEXT_PUBLIC_AUTHAPI_URL = process.env.NEXT_PUBLIC_AUTHAPI_URL

export const apiClient = axios.create({
    baseURL: NEXT_PUBLIC_AUTHAPI_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000,
})