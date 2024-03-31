import axios from 'axios';
import { USER_LOCAL_STORAGE_KEY } from 'components/auth-modal/hook/auth/user.localstorage';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 2500,
  headers: {
    'Content-Type': 'application/json',
    withCredential: true,
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(USER_LOCAL_STORAGE_KEY);

    if (token) {
      config.headers['Authorization'] = `Bearer ${JSON.parse(token).token}`;
    } else {
      delete config.headers['Authorization'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
