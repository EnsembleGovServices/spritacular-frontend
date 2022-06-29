import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const instance = axios.create({
    baseURL: API_URL
});

const axiosPrivate = axios.create({
    baseURL: API_URL,
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
});

axiosPrivate.interceptors.request.use(function (config) {
    // Do something before request is sent
    // config.headers.Authorization = `Bearer ${auth?.token?.access}`;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default axiosPrivate;