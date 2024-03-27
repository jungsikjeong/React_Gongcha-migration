import { fetchUserInfo } from 'api/auth';
import { useQuery } from 'react-query';

const useAuthenticate = () => {
  const {
    data: userLoginInfo,
    isLoading,
    isError,
  } = useQuery('userInfo', fetchUserInfo);

  return { userLoginInfo, isLoading, isError };
};

export default useAuthenticate;
