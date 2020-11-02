import axios from 'axios';
import { logout, getToken } from './auth';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
});

let ctx = { req: {}, res: {} };

api.interceptors.request.use(
  (config) => {
    const token = getToken(ctx);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set JWT token
    }
    return config;
  },
  (error) => {
    // Do something with request error
    Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
        logout();
    }
    return Promise.reject(error);
  },
);

export default api;
