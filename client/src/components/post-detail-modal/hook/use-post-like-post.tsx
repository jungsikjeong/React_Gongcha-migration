import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from 'api/instance';
import { IUserInfo } from 'interface/auth';
import { userKey } from 'react-query-key/auth.keys';
import { postDetailKey } from 'react-query-key/post.key';
import { toast } from 'react-toastify';

interface IPostLikeProps {
  postId: string;
}

interface ICustomResponse<T, U> {
  data: T;
  msg?: U;
}
const postLikePost = async ({ postId }: IPostLikeProps) => {
  const res: ICustomResponse<string, any> = await instance.put<string>(
    `/api/posts/like/${postId}`
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
const usePostLikePost = (
  postId: string,
  user: IUserInfo | null | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLikePost,
    mutationKey: ['post-like'],

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [postDetailKey.post, postId],
        refetchType: 'all',
      });
      queryClient.invalidateQueries({
        queryKey: [userKey.user],
        refetchType: 'all',
      });
    },
    onError: (error: any) => {
      console.log('error:', error);
      toast.error('다시 시도해주세요');
      if (error?.response?.status === 401) {
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }
    },
  });
};

export default usePostLikePost;
