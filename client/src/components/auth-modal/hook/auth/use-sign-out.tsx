import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { userKey } from 'react-query-key/auth.keys';

type IUseSignOut = () => void;

export function useSignOut(): IUseSignOut {
  const queryClient = useQueryClient();

  const onSignOut = useCallback(() => {
    queryClient.setQueryData([userKey.user], null);
  }, [queryClient]);

  return onSignOut;
}
