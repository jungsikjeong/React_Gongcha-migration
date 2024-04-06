import { useQuery } from '@tanstack/react-query';
import instance from 'api/instance';
import { postsKey } from 'react-query-key/post.key';

const fetchPosts = async () => {
  const res = await instance.get('/api/posts');
  return res.data;
};

const UseFetchPosts = () => {
  const { data, isLoading } = useQuery({
    queryKey: [postsKey],
    queryFn: () => fetchPosts(),
    refetchOnWindowFocus: false,
    staleTime: 15000,
  });

  return { data, isLoading };
};

export default UseFetchPosts;
