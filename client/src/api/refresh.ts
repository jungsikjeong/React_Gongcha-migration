import instance from './instance';

export const fetchRefresh = async () => {
  try {
    const res = await instance.get('/api/auth/refresh');
    console.log(res);
    return res.data.userInfo;
  } catch (error: any) {
    if (error?.response?.data?.msg === '리프레시 토큰 없음') {
      return;
    }
  }
};
