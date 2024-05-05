import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from 'api/instance';
import { IUserInfo } from 'interface/auth';
import { userKey } from 'react-query-key/auth.keys';
import { toast } from 'react-toastify';

interface IBodyProps {
  avatar?: string;
  password?: string;
  nickname?: string;
}

interface ICustomResponse<T, U> {
  data: T;
  msg?: U;
}
const postUserEdit = async (body: IBodyProps) => {
  const res: ICustomResponse<string, any> = await instance.post(
    `/api/users/edit/profile`,
    body
  );

  if (res.msg === '리프레시 토큰 만료됨') {
    toast.error('로그인 기한이 만료되었습니다. 다시 로그인 해주세요!');
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  }

  return res.data;
};

// 게시글 좋아요 뮤테이션
const usePostEditProfile = (user: IUserInfo | null | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUserEdit,
    mutationKey: ['user-edit'],

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [userKey.user, user],
        refetchType: 'all',
      });

      window.location.reload();
      toast.success('프로필이 업데이트 되었습니다.');
    },
    onError: (error: any) => {
      console.log('error:', error);
      toast.error('다시 시도해주세요');
      if (error?.response?.status === 401) {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    },
  });
};

export default usePostEditProfile;
