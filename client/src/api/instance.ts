import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 2500,
  headers: { 'X-Custom-Header': 'foobar' },
});

const token = localStorage.getItem('token');

setAuthToken(token);

export default instance;
