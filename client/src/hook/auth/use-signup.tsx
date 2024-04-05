import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from 'api/instance';
import { authModalState } from 'atom/auth-modal-atoms';
import { welcomeState } from 'atom/welcome-atoms';
import { IRegister } from 'interface/auth';
import { userKey } from 'react-query-key/auth.keys';
import { useSetRecoilState } from 'recoil';

const postRegister = async (body: IRegister) => {
  const { data } = await instance.post('/api/users', body);

  return data;
};

const usePostSignUp = (setError: any) => {
  const queryClient = useQueryClient();
  const setAuthModalState = useSetRecoilState(authModalState);
  const setWelcomeState = useSetRecoilState(welcomeState);

  return useMutation({
    mutationFn: postRegister,
    mutationKey: ['sign-up'],

    onSuccess: (data) => {
      queryClient.setQueryData([userKey.user], data);
      setAuthModalState(false);
      setWelcomeState(true);
    },
    onError: (error: any) => {
      if (error.response?.status === 400) {
        const type = error?.response?.data?.errors[0]?.type;
        const message = error?.response?.data?.errors[0]?.msg;
        setError(type, {
          message: message,
        });
      }
    },
  });
};

export default usePostSignUp;
