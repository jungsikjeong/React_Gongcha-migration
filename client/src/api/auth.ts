import axios from 'axios';
import { IRegister } from '../interface/auth';

export const postRegister = async ({
  nickname,
  email,
  password,
}: IRegister) => {
  const body = JSON.stringify({ nickname, email, password });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    // const res = await axios.post('/api/users', body, config);
    const res = await axios.get('/api/hello');
    console.log(res);
  } catch (error) {
    console.error('Error occurred while registering:', error);
  }
};
