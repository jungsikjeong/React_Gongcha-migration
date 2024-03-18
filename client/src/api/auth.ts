import { AxiosResponse } from 'axios';
import { IRegister } from '../interface/auth';
import instance from './instance';

type UserType = {
  nickname: string;
  email: string;
};

interface IErrorResponse {
  type: string;
  msg: string;
}

interface IRegisterResponse {
  token: string;
  user: UserType;
}

export const fetchUserInfo = async () => {
  try {
    const res = await instance.get('/api/auth');

    return res;
  } catch (error: any) {
    console.log(error);
  }
};

export const postLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AxiosResponse<any> | IErrorResponse> => {
  const body = JSON.stringify({ email, password });

  try {
    const res: AxiosResponse<any> = await instance.post('/api/auth', body);

    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }

    return res;
  } catch (error: any) {
    console.error('Error occurred while registering:', error);
    return {
      type: error?.response?.data?.errors[0]?.type,
      msg:
        error?.response?.data?.errors[0]?.msg ||
        '알 수 없는 오류가 발생했습니다.',
    };
  }
};

export const postRegister = async ({
  nickname,
  email,
  password,
  password2,
}: IRegister): Promise<AxiosResponse<IRegisterResponse> | IErrorResponse> => {
  const body = JSON.stringify({ nickname, email, password, password2 });

  try {
    const res: AxiosResponse<IRegisterResponse> = await instance.post(
      '/api/users',
      body
    );

    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }

    return res;
  } catch (error: any) {
    console.error('Error occurred while registering:', error);
    return {
      type: error?.response?.data?.errors[0]?.type,
      msg:
        error?.response?.data?.errors[0]?.msg ||
        '알 수 없는 오류가 발생했습니다.',
    };
  }
};
