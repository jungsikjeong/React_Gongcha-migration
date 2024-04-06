import { useQueryClient } from '@tanstack/react-query';
import instance from 'api/instance';
import { useCallback } from 'react';
import { userKey } from 'react-query-key/auth.keys';
import { toast } from 'react-toastify';
import { removeToken } from './token.localstorage';

type IUseSignOut = () => void;

const fetchUserLogout = async () => {
  await instance.get('/api/auth/logout');
};

export const useSignOut = (): IUseSignOut => {
  const queryClient = useQueryClient();

  const onSignOut = useCallback(async () => {
    await fetchUserLogout();
    queryClient.setQueryData([userKey.user], null);
    removeToken();
    toast.success('로그아웃 되셨습니다.');
  }, [queryClient]);

  return onSignOut;
};
