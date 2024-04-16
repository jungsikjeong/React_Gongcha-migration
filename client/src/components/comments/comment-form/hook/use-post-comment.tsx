import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from 'api/instance';
import { commentKey } from 'react-query-key/comment.keys';
import { toast } from 'react-toastify';

interface IPostComment {
  contents: string;
  postId: string;
}

const postComment = async ({ contents, postId }: IPostComment) => {
  const res: any = await instance.post('/api/comment', {
    contents,
    postId,
  });

  if (res.msg === '리프레시 토큰 만료됨') {
    toast.error('로그인 기한이 만료되었습니다. 다시 로그인 해주세요!');
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  }
  return res.data;
};

const usePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postComment,
    mutationKey: ['commentKey'],

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [commentKey.comment],
        refetchType: 'all',
      });
    },
    onError: (error: any) => {
      console.log('error:', error);
      toast.error('댓글 작성 중 오류가 발생했습니다. 다시 시도해주세요');
      if (error?.response?.status === 401) {
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }
    },
  });
};

export default usePostComment;
