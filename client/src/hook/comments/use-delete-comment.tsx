import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from 'api/instance';
import { commentKey } from 'react-query-key/comment.keys';
import { postDetailKey } from 'react-query-key/post.keys';
import { toast } from 'react-toastify';

interface IDeleteCommentProps {
  commentId: string;
  postId: string;
}

const deleteComment = async ({ commentId, postId }: IDeleteCommentProps) => {
  const res = await instance.delete(
    `/api/comment/${commentId}?postId=${postId}`
  );
  return res.data;
};

const useDeleteComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    mutationKey: ['comment-delete'],

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [commentKey.comment, postId],
        refetchType: 'all',
      });
      queryClient.invalidateQueries({
        queryKey: [postDetailKey.post],
        refetchType: 'all',
      });
    },
    onError: (error: any) => {
      console.log('error:', error);
      toast.error('댓글 삭제중 에러가 발생했습니다. 다시 시도해주세요');
    },
  });
};

export default useDeleteComment;
