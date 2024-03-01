import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru'
});

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');

    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
})