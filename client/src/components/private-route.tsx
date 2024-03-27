import useAuthenticate from 'hook/use-authenticate';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from './common/loading';

export const PrivateRoute = () => {
  const { userLoginInfo, isLoading, isError } = useAuthenticate();

  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !userLoginInfo) {
    // 에러가 발생하거나 사용자 로그인 정보가 없는 경우 로그인 페이지로 이동
    navigate('/');
    return null;
  }

  // 사용자 로그인 정보가 있으면 Outlet을 반환하여 해당 경로로 이동
  return <Outlet />;
};
