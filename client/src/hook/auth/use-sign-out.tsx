import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { userKey } from 'react-query-key/auth.keys';
import { toast } from 'react-toastify';

type IUseSignOut = () => void;

export function useSignOut(): IUseSignOut {
  const queryClient = useQueryClient();

  const onSignOut = useCallback(() => {
    queryClient.setQueryData([userKey.user], null);
    toast.success('로그아웃 되셨습니다.');
  }, [queryClient]);

  return onSignOut;
}
