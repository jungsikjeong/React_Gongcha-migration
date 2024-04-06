import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from 'api/instance';
import { authModalState } from 'atom/auth-modal-atoms';
import { ILogin } from 'interface/auth';
import { userKey } from 'react-query-key/auth.keys';
import { useSetRecoilState } from 'recoil';
import { setToken } from './token.localstorage';

const postLogin = async (body: ILogin) => {
  const res = await instance.post('/api/auth', body);
  return res.data;
};

const usePostSignIn = (setError: any) => {
  const queryClient = useQueryClient();

  const setAuthModalState = useSetRecoilState(authModalState); // auth modal 닫음

  return useMutation({
    mutationFn: postLogin,
    mutationKey: ['sign-in'],

    onSuccess: (data) => {
      queryClient.setQueryData([userKey.user], data.userInfo);
      setToken(data.token);
      setAuthModalState(false);
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

export default usePostSignIn;
