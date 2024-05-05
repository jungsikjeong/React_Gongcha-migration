import { useInfiniteQuery } from '@tanstack/react-query';
import instance from 'api/instance';
import { PostsDataType } from 'interface/posts';
import { useEffect } from 'react';
import { postsKey } from 'react-query-key/post.keys';
import { toast } from 'react-toastify';
import { cardSizeRandomFn } from 'utils/card-size-random';

interface IPostsResponse {
  page: number;
  posts: PostsDataType[];
  totalCount: number;
  totalPage: number;
}

export const fetchPosts = async (
  pageParam: number,
  searchParams: string
): Promise<IPostsResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await instance.get<IPostsResponse>(
    '/api/posts?/page=' + pageParam,
    {
      params: {
        limit: 20,
        page: pageParam,
        searchParams,
      },
    }
  );

  const newResData = { ...res?.data };

  const newData: PostsDataType[] = [];

  res?.data?.posts.map((item) =>
    newData.push({ ...item, className: cardSizeRandomFn() })
  );
  newResData.posts = newData;

  return newResData;
};

const useFetchPosts = (postId: string, searchParams: string) => {
  const {
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    data,
    error,
  } = useInfiniteQuery({
    queryKey: [postsKey.posts],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.posts?.length > 0 ? lastPage.page + 1 : undefined;
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

export default useFetchPosts;
