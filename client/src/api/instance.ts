import axios from 'axios';
import { getToken } from 'hook/auth/token.localstorage';

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
//todo:: 이거에대해서 생각해보자
// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     console.log('얍');
//     if (error.response.status === 401) {
//       try {
//         const res = await instance.get('/api/auth/refresh');
//         if (res.status === 200) {
//           setToken(res.data.token);
//           const token = getToken();

//           error.config.headers['Authorization'] = `Bearer ${token}`;
//         }
//       } catch (error) {
//         console.log('리프레시 에러 :', error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );
export default instance;
