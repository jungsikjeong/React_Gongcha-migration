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
}

const fetchPosts = async () => {
  const res = await instance.get<IPostsData[]>('/api/posts');

  const newData: IPostsData[] | null = [];
  res?.data.map((item: any) =>
    newData.push({ ...item, className: cardSizeRandomFn() })
  );
  console.log(newData);
  return newData;
};

const UseFetchPosts = () => {
  const { data, isLoading } = useQuery({
    queryKey: [postsKey.posts],
    queryFn: () => fetchPosts(),
    refetchOnWindowFocus: false,
    staleTime: 15000,
  });

  return { data, isLoading };
};

export default UseFetchPosts;
