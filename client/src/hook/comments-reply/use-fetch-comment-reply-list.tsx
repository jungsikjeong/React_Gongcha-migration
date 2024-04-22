import { useQuery } from '@tanstack/react-query';
import instance from 'api/instance';
import { CommentReplyTypes } from 'interface/comment';
import { useEffect } from 'react';
import { commentKey } from 'react-query-key/comment.keys';
import { toast } from 'react-toastify';

const fetchCommentReplyList = async (commentId: string) => {
  const res = await instance.get<CommentReplyTypes[]>(
    `/api/reply/comment/${commentId}`
  );

  return res.data;
};

const useFetchCommentReplyList = (commentId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [commentKey.commentReply, commentId],
    queryFn: () => fetchCommentReplyList(commentId),
    refetchOnWindowFocus: false,
    staleTime: 15000,
  });

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error('대댓글을 불러오는데 실패했습니다.');
    }
  }, [error]);

  return { data, isLoading, error };
};

export default useFetchCommentReplyList;
