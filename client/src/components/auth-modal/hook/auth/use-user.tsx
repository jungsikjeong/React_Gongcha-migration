import { useQuery } from '@tanstack/react-query';
import instance from 'api/instance';
import { IUserInfo } from 'interface/auth';
import { useEffect } from 'react';
import { userKey } from 'react-query-key/auth.keys';
import * as userLocalStorage from './user.localstorage';

const fetchUserInfo = async (user: any) => {
  console.log('user:', user);
  const token = localStorage.getItem(userLocalStorage.USER_LOCAL_STORAGE_KEY);

  const res: any = await instance.get('/api/auth', {
    headers: {
      Authorization: `Bearer${JSON.parse(token as any).token}`,
    },
  });
  return res.data;
};

interface IUseUser {
  user: IUserInfo | null;
}

export function useUser(): IUseUser {
  const { error, data: user } = useQuery({
    queryKey: [userKey.user],
    queryFn: async () => await fetchUserInfo(userLocalStorage.getUser()),
    initialData: userLocalStorage.getUser,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  useEffect(() => {
    if (!user || error) {
      userLocalStorage.removeUser();
    } else userLocalStorage.saveUser(user);
  }, [user, error]);

  return {
    user: user ?? null,
  };
}
