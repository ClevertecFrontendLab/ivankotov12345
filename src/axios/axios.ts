import { AxiosPaths } from '@typing/enums/axios-paths';
import axios from 'axios';

export const instance = axios.create({
    baseURL: AxiosPaths.BASE_URL
});

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  const currentConfig = config;

  currentConfig.headers.Authorization = token ? `Bearer ${token}` : '';

  return currentConfig;
});