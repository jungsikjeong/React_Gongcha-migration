import { useInfiniteQuery } from '@tanstack/react-query';
import instance from 'api/instance';
import { ICommentResponse } from 'interface/comment';
import { useEffect } from 'react';
import { commentKey } from 'react-query-key/comment.keys';
import { toast } from 'react-toastify';

const fetchCommentList = async (
  postId: string,
  pageParam: number
): Promise<ICommentResponse> => {
  const res = await instance.get<ICommentResponse>(
    `/api/comment/${postId}?page=${pageParam}`,
    {
      params: {
        limit: 10,
        page: pageParam,
      },
    }
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res.data);
    }, 1000);
  });
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
      return lastPage.commentList?.length > 0 ? lastPage.page + 1 : undefined;
    },
  });

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error('댓글을 불러오는데 실패했습니다.');
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

export default useFetchCommentList;
