import { useQuery, useQueryClient } from '@tanstack/react-query';
import instance from 'api/instance';
import { IUserInfo } from 'interface/auth';
import { useEffect } from 'react';
import { userKey } from 'react-query-key/auth.keys';
import { toast } from 'react-toastify';

const fetchUserInfo = async () => {
  const res = await instance.get<IUserInfo>('/api/auth');
  if ('msg' in res) {
    // 리프레시 토큰 유효기간 만료되면
    toast.error('로그인을 다시해주세요');
    return;
  }
  return res.data;
};

interface IUseUser {
  user: IUserInfo | null | undefined;
  isLoading: boolean;
}

export function useUser(): IUseUser {
  const queryClient = useQueryClient();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: [userKey.user],
    queryFn: async () => await fetchUserInfo(),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (user) {
      queryClient.setQueryData([userKey.user], user);
    } else if (error) {
      queryClient.setQueryData([userKey.user], null);
    }
  }, [user, error]);

  return {
    user: user ?? user,
    isLoading,
  };
}
