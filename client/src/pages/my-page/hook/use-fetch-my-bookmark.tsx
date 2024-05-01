import { useInfiniteQuery } from '@tanstack/react-query';
import instance from 'api/instance';
import { IBookmarkResponse } from 'interface/bookmark';
import { useEffect } from 'react';
import { myPageKey } from 'react-query-key/my-page';
import { toast } from 'react-toastify';

const fetchMyBookmark = async (pageParam: number) => {
  const res = await instance.get<IBookmarkResponse>(
    `/api/myPage/bookmarks/?page=${pageParam}`
  );
  return res.data;
};

const useFetchMyBookmark = () => {
  const {
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    data,
    error,
  } = useInfiniteQuery({
    queryKey: [myPageKey.myBookmark],
    queryFn: ({ pageParam = 1 }) => fetchMyBookmark(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.posts?.length > 0 && lastPage.page !== lastPage.totalPage
        ? lastPage.page + 1
        : undefined;
    },
  });

  useEffect(() => {
    if (error) {
      toast.error('게시글을 불러오는데 실패했습니다.');
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

export default useFetchMyBookmark;
