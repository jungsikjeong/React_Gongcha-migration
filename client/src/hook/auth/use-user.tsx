import { useQuery, useQueryClient } from '@tanstack/react-query';
import instance from 'api/instance';
import { IUserInfo } from 'interface/auth';
import { useEffect } from 'react';
import { userKey } from 'react-query-key/auth.keys';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as userLocalStorage from './user.localstorage';

const fetchUserInfo = async () => {
  try {
    const token = localStorage.getItem(userLocalStorage.USER_LOCAL_STORAGE_KEY);
    const res: any = await instance.get('/api/auth', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token as any).token}`,
      },
    });

    return res.data;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      try {
        const res = await instance.get('/api/auth/refresh');

        return res.data;
      } catch (refreshError) {
        if (error?.response?.status === 401) {
          toast.warning('다시 로그인 해주세요!');
          Navigate({ to: '/' });
        }
      }
    }
  }
};

interface IUseUser {
  user: IUserInfo | null;
}

export function useUser(): IUseUser {
  const queryClient = useQueryClient();

  const { error, data: user } = useQuery({
    queryKey: [userKey.user],
    queryFn: async () => await fetchUserInfo(),

    initialData: userLocalStorage.getUser,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 10, // 10분
    refetchInterval: 1000 * 60 * 10, // 10분
  });

  useEffect(() => {
    if (!user || error) {
      queryClient.setQueryData([userKey.user], null);
      userLocalStorage.removeUser();
    } else userLocalStorage.saveUser(user);
  }, [user, error, queryClient]);

  return {
    user: user ?? null,
  };
}
