import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from 'api/instance';
import { IComment } from 'interface/comment';
import { commentKey } from 'react-query-key/comment.keys';
import { toast } from 'react-toastify';

interface IPostLikeCommentsProps {
  commentReplyId: string;
  parentCommentId: string;
  postId: string;
}
const postLikeCommentReply = async ({
  commentReplyId,
  parentCommentId,
  postId,
}: IPostLikeCommentsProps) => {
  const res = await instance.put<IComment[]>(
    `/api/reply/like/${commentReplyId}?parentCommentId=${parentCommentId}`,
    {
      postId,
    }
  );

  return res.data;
};

// 대댓글 좋아요 뮤테이션
const usePostLikeCommentReply = (commentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLikeCommentReply,
    mutationKey: ['comment-reply-like'],

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [commentKey.commentReply, commentId],
        refetchType: 'all',
      });
    },
    onError: (error: any) => {
      console.log('error:', error);
      toast.error('에러가 발생했습니다. 다시 시도해주세요');
    },
  });
};

export default usePostLikeCommentReply;
