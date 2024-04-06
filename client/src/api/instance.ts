import axios from 'axios';
import { getToken, setToken } from 'hook/auth/token.localstorage';

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
    const token = getToken();

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete config.headers['Authorization'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // removeToken();

    if (error.response.status === 401) {
      try {
        const res = await axios.get('/api/auth/refresh');

        if (res.status === 200) {
          setToken(res.data.token);
          const token = getToken();
          console.log('token:', token);

          error.config.headers['Authorization'] = `Bearer ${token}`;
          res.data = res.data.userInfo;

          return res;
        }
      } catch (error: any) {
        delete error.config.headers['Authorization'];

        console.log('리프레시 에러 :', error);
      }
    }
    return Promise.reject(error);
  }
);
export default instance;
