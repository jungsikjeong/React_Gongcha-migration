import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from 'api/instance';
import { postsKey } from 'react-query-key/post.keys';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IDeletePostProps {
  postId: string;
}

interface ICustomResponse<T, U> {
  data: T;
  msg?: U;
}
const deletePost = async ({ postId }: IDeletePostProps) => {
  const res: ICustomResponse<string, any> = await instance.delete<string>(
    `/api/posts/${postId}`
  );

  if (res.msg === '리프레시 토큰 만료됨') {
    toast.error('로그인 기한이 만료되었습니다. 다시 로그인 해주세요!');
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  }

  return res.data;
};

const useDeletePost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    mutationKey: ['post-delete'],

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [postsKey.posts],
        refetchType: 'all',
      });
      navigate(-1);
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

export default useDeletePost;
