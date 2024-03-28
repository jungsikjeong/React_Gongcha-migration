import { fetchUserInfo } from 'api/auth';
import { useQuery } from 'react-query';
import { userInfoKeys } from 'utils/query-keys';

const useAuthenticate = () => {
  const {
    data: userLoginInfo,
    isLoading,
    isError,
  } = useQuery(userInfoKeys.all, fetchUserInfo, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return { userLoginInfo, isLoading, isError };
};

export default useAuthenticate;
