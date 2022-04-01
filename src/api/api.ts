import axios from 'axios';

const API_URL = 'http://192.168.1.67:3333/api/';

const api = axios.create({
    baseURL: API_URL,
});

export default api;