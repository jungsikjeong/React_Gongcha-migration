import { useQuery } from '@tanstack/react-query';
import instance from 'api/instance';
import { useEffect } from 'react';
import { postDetailKey } from 'react-query-key/post.key';
import { toast } from 'react-toastify';

const fetchLikePost = async (postId: string) => {
  const res = await instance.get(`/api/posts/like/${postId}`);

  return res.data;
};

const useFetchLikePost = (postId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [postDetailKey.post, 'z'],
    queryFn: () => fetchLikePost(postId),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (error) {
      toast.error('게시글을 불러오는데 실패했습니다.');
    }
  }, [error]);

  return { data, isLoading, error };
};

export default useFetchLikePost;
