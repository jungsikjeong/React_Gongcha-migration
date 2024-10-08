import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../hook/auth/use-user';

export const PrivateRoute = () => {
  const { user, isLoading } = useUser();

  if (!user && !isLoading) return <Navigate to='/' replace />;

  // 사용자 로그인 정보가 있으면 Outlet을 반환하여 해당 경로로 이동
  return <Outlet />;
};
