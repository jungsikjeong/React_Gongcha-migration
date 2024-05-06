import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from 'api/instance';
import { commentKey } from 'react-query-key/comment.keys';
import { toast } from 'react-toastify';

interface IPostComment {
  contents: string;
  commentId: string;
  postId: string;
}

const postReplyComment = async ({
  contents,
  postId,
  commentId,
}: IPostComment) => {
  const res: any = await instance.post(`/api/reply/comment/${commentId}`, {
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

const usePostReplyComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postReplyComment,
    mutationKey: ['comment-reply-post'],

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [commentKey.commentReply],
        refetchType: 'all',
      });
      queryClient.refetchQueries({ queryKey: [commentKey.comment] });
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

export default usePostReplyComment;
