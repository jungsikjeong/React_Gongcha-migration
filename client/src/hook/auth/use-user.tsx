import { useQuery, useQueryClient } from '@tanstack/react-query';
import instance from 'api/instance';
import { IUserInfo } from 'interface/auth';
import { useEffect } from 'react';
import { userKey } from 'react-query-key/auth.keys';

const fetchUserInfo = async () => {
  const res = await instance.get('/api/auth');

  return res.data;
};

interface IUseUser {
  user: IUserInfo | null;
}

export function useUser(): IUseUser {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: [userKey.user],
    queryFn: async () => await fetchUserInfo(),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (user) {
      queryClient.setQueryData([userKey.user], user);
    }
  }, [user]);

  return {
    user: user ?? null,
  };
}
