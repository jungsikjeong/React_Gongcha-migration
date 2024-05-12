import { useQuery } from '@tanstack/react-query';
import instance from 'api/instance';
import { PostsDataType } from 'interface/posts';
import { postDetailKey } from 'react-query-key/post.keys';

const fetchPost = async (id: string) => {
  const res = await instance.get<PostsDataType>(`/api/posts/${id}`);

  return res.data;
};

const useFetchPostDetail = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [postDetailKey.post, id],
    queryFn: () => fetchPost(id),
    refetchOnWindowFocus: false,
    staleTime: 15000,
  });

  return { data, isLoading, error };
};

export default useFetchPostDetail;
