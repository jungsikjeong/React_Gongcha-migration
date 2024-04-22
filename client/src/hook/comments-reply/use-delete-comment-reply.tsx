import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from 'api/instance';
import { commentKey } from 'react-query-key/comment.keys';
import { toast } from 'react-toastify';

interface IDeleteCommentProps {
  commentReplyId: string;
  parentCommentId: string;
}

const deleteCommentReply = async ({
  commentReplyId,
  parentCommentId,
}: IDeleteCommentProps) => {
  const res = await instance.delete(
    `/api/reply/${commentReplyId}?parentCommentId=${parentCommentId}`
  );

  return res.data;
};

const useDeleteCommentReply = (commentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCommentReply,
    mutationKey: ['comment-reply-delete'],

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [commentKey.commentReply, commentId],
        refetchType: 'all',
      });
      queryClient.refetchQueries({ queryKey: [commentKey.comment] });
    },
    onError: (error: any) => {
      console.log('error:', error);
      if (error?.response?.data?.msg) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error('댓글 삭제중 에러가 발생했습니다. 다시 시도해주세요');
      }
    },
  });
};

export default useDeleteCommentReply;
