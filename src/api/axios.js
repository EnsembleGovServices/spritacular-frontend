import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

// A new instance of axios with a custom config.
const axiosPrivate = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${auth?.token?.access}`
    },
    withCredentials: true
});

axiosPrivate.interceptors.request.use((config) => {
    // Do something before request is sent
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : null;
    return config;
}, (error) => Promise.reject(error)); // Do something with request error

export default axiosPrivate;