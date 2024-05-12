import { useInfiniteQuery } from '@tanstack/react-query';
import instance from 'api/instance';
import { IBookmarkResponse } from 'interface/bookmark';
import { myPageKey } from 'react-query-key/my-page-keys';

const fetchMyBookmark = async (
  pageParam: number
): Promise<IBookmarkResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

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
      return lastPage?.posts?.length > 0 &&
        lastPage?.page !== lastPage?.totalPage
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

export default useFetchMyBookmark;
