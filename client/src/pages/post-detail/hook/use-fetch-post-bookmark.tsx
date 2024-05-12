import { useQuery } from '@tanstack/react-query';
import instance from 'api/instance';
import { postDetailKey } from 'react-query-key/post.keys';

const fetchPostBookmark = async (postId: string) => {
  const res = await instance.get<boolean>(`/api/posts/bookmark/${postId}`);
  return res.data;
};

const useFetchPostBookmark = (postId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [postDetailKey.postBookmark, postId],
    queryFn: () => fetchPostBookmark(postId),
    refetchOnWindowFocus: false,
    staleTime: 15000,
  });

  return { data, isLoading, error };
};

export default useFetchPostBookmark;
