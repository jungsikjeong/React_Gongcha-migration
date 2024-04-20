import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from 'api/instance';
import { IComment } from 'interface/comment';
import { commentKey } from 'react-query-key/comment.keys';
import { toast } from 'react-toastify';

interface IPostLikeCommentsProps {
  commentId: string;
  postId: string;
}
const postLikeComments = async ({
  commentId,
  postId,
}: IPostLikeCommentsProps) => {
  const res = await instance.put<IComment[]>(
    `/api/comment/like/${commentId}?postId=${postId}`
  );

  return res.data;
};

// 댓글 좋아요 뮤테이션
const usePostLikeComments = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLikeComments,
    mutationKey: ['comment-like'],

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [commentKey.comment, postId],
        refetchType: 'all',
      });
    },
    onError: (error: any) => {
      console.log('error:', error);
      toast.error('에러가 발생했습니다. 다시 시도해주세요');
    },
  });
};

export default usePostLikeComments;
