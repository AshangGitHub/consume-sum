import axios, { AxiosInstance } from 'axios';
import { axiosAfterGuard, axiosBeforeGuard } from './guard';
import { API_TIME_OUT, AUTH_TOKEN_NAME, GLOBAL_API_PATH_PREFIX } from '@/config/index.config';

// const baseURL =
//   import.meta.env.MODE !== 'development'
//     ? `${(import.meta.env.VITE_BASE_URL as string) || ''}${GLOBAL_API_PATH_PREFIX}`
//     : GLOBAL_API_PATH_PREFIX;

const baseURL = `${import.meta.env.VITE_BASE_URL}${GLOBAL_API_PATH_PREFIX}`;

const token = window.localStorage.getItem(AUTH_TOKEN_NAME);
const axiosInstance: AxiosInstance = axios.create({
  baseURL: GLOBAL_API_PATH_PREFIX,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: token || '',
  },
  timeout: API_TIME_OUT,
});

// // axios实例拦截请求
axiosInstance.interceptors.request.use(
  axiosBeforeGuard.onFulfilled,
  axiosBeforeGuard.onRejected
);

// // axios实例拦截响应
axiosInstance.interceptors.response.use(
  axiosAfterGuard.onFulfilled,
  axiosAfterGuard.onRejected
);

export { axiosInstance };
