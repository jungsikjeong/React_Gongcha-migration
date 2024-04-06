import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import instance from 'api/instance';
import { fetchRefresh } from 'api/refresh';
import { authModalState } from 'atom/auth-modal-atoms';
import { IUserInfo } from 'interface/auth';
import { useEffect } from 'react';
import { userKey } from 'react-query-key/auth.keys';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';

interface IFetchUserInfo {
  setAuthModalState: SetterOrUpdater<boolean>;
}

const fetchUserInfo = async ({ setAuthModalState }: IFetchUserInfo) => {
  try {
    const res = await instance.get('/api/auth');

    return res.data;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      const data = await fetchRefresh();

      return data || null;
    }
  }
};

interface IUseUser {
  user: IUserInfo | null;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<any, Error>>;
}

export function useUser(): IUseUser {
  const setAuthModalState = useSetRecoilState(authModalState);
  const queryClient = useQueryClient();

  const { data: user, refetch } = useQuery({
    queryKey: [userKey.user],
    queryFn: async () => await fetchUserInfo({ setAuthModalState }),
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
    refetch,
  };
}
