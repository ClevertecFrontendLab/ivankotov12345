import axios from 'axios';
import { AxiosPaths } from '@typing/enums/axios-paths';

export const instance = axios.create({
    baseURL: AxiosPaths.BASE_URL
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});