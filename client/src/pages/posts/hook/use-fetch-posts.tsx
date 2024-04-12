import { useQuery } from '@tanstack/react-query';
import instance from 'api/instance';
import { postsKey } from 'react-query-key/post.key';
import { cardSizeRandomFn } from 'utils/card-size-random';

interface IPostsData {
  author: string;
  className?: string;
  commentsCount: number;
  content: string;
  date: string;
  images: string[];
  postLikeCount: number;
  __v: number;
  _id: string;
  nextCursor?: any;
  lastPage?: {
    nextCursor: any;
  };
}

// 임시 any
export const fetchPosts = async (pageParam: any, searchParams: any) => {
  const res = await instance.get<any>('/api/posts?/page=' + pageParam, {
    params: {
      limit: 10,
      page: pageParam,
      ...searchParams,
    },
  });

  const newResData = { ...res?.data };

  const newData: any = [];
  res?.data?.posts.map((item: any) =>
    newData.push({ ...item, className: cardSizeRandomFn() })
  );
  newResData.posts = newData;

  return newResData;
};

const UseFetchPosts = (pageParam: any, searchParams: any) => {
  const { data, isLoading } = useQuery({
    queryKey: [postsKey.posts],
    queryFn: () => fetchPosts(pageParam, searchParams),
    refetchOnWindowFocus: false,
    staleTime: 15000,
  });

  return { data, isLoading };
};

export default UseFetchPosts;
