import axios from 'axios';
import {BASE_DOMAIN, PREFIX, VERSIOM} from './Constant';
import {useSelector} from 'react-redux';
import {RootState} from '../store/modules';

const axiosInstance = axios.create({
  baseURL: BASE_DOMAIN + VERSIOM + PREFIX,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);
axiosInstance.interceptors.response.use(
  config => {
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

export default axiosInstance;
