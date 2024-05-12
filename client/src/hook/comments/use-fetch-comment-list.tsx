import { useInfiniteQuery } from '@tanstack/react-query';
import instance from 'api/instance';
import { ICommentResponse } from 'interface/comment';
import { commentKey } from 'react-query-key/comment.keys';

const fetchCommentList = async (postId: string, pageParam: number) => {
  const res = await instance.get<ICommentResponse>(
    `/api/comment/${postId}?page=${pageParam}`,
    {
      params: {
        limit: 10,
        page: pageParam,
      },
    }
  );

  return res.data;
};

const useFetchCommentList = (postId: string) => {
  const {
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    data,
    error,
  } = useInfiniteQuery({
    queryKey: [commentKey.comment, postId],
    queryFn: ({ pageParam = 1 }) => fetchCommentList(postId, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.commentList?.length > 0 &&
        lastPage.page !== lastPage.totalPage
        ? lastPage.page + 1
        : undefined;
    },
  });

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

export default useFetchCommentList;
