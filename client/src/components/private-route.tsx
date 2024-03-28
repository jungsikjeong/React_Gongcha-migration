import useAuthenticate from 'hook/use-authenticate';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from './common/loading';

export const PrivateRoute = () => {
  const { userLoginInfo, isLoading, isError } = useAuthenticate();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (isError || !userLoginInfo)) {
      // 에러가 발생하거나 사용자 로그인 정보가 없는 경우 로그인 페이지로 이동
      navigate('/');
    }
  }, [isLoading, isError, navigate, userLoginInfo]);

  if (isLoading) {
    return <Loading />;
  }

  // 사용자 로그인 정보가 있으면 Outlet을 반환하여 해당 경로로 이동
  return <Outlet />;
};
