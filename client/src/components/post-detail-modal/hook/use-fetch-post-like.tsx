import { useQuery } from '@tanstack/react-query';
import instance from 'api/instance';
import { useEffect } from 'react';
import { postDetailKey } from 'react-query-key/post.keys';
import { toast } from 'react-toastify';

const fetchPostLike = async (postId: string) => {
  const res = await instance.get<boolean>(`/api/posts/like/${postId}`);
  return res.data;
};

const useFetchPostLike = (postId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [postDetailKey.postLike, postId],
    queryFn: () => fetchPostLike(postId),
    refetchOnWindowFocus: false,
    staleTime: 15000,
  });

  useEffect(() => {
    if (error) {
      toast.error('게시글을 불러오는데 실패했습니다.');
    }
  }, [error]);

  return { data, isLoading, error };
};

export default useFetchPostLike;
