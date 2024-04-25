import { useInfiniteQuery } from '@tanstack/react-query';
import instance from 'api/instance';
import { ICommentReplyResponse } from 'interface/comment';
import { useEffect } from 'react';
import { commentKey } from 'react-query-key/comment.keys';
import { toast } from 'react-toastify';

const fetchCommentReplyList = async (
  commentId: string,
  pageParam: number
): Promise<ICommentReplyResponse> => {
  const res = await instance.get<ICommentReplyResponse>(
    `/api/reply/comment/${commentId}?page=${pageParam}`,
    {
      params: {
        limit: 3,
        page: pageParam,
      },
    }
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res.data);
    }, 500);
  });
};

const useFetchCommentReplyList = (commentId: string) => {
  const {
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    data,
    error,
  } = useInfiniteQuery({
    queryKey: [commentKey.commentReply, commentId],
    queryFn: ({ pageParam = 1 }) => fetchCommentReplyList(commentId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.commentReply?.length > 0 &&
        lastPage.page !== lastPage.totalPage
        ? lastPage.page + 1
        : undefined;
    },
    refetchOnWindowFocus: false,
    // staleTime: 15000,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error('대댓글을 불러오는데 실패했습니다.');
    }
  }, [error]);

  return {
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    data,
    error,
  };
};

export default useFetchCommentReplyList;
