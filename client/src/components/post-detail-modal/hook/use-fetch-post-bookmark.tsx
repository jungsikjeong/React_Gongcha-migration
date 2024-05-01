import { useQuery } from '@tanstack/react-query';
import instance from 'api/instance';
import { useEffect } from 'react';
import { postDetailKey } from 'react-query-key/post.key';
import { toast } from 'react-toastify';

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

  useEffect(() => {
    if (error) {
      toast.error('게시글을 불러오는데 실패했습니다.');
    }
  }, [error]);

  return { data, isLoading, error };
};

export default useFetchPostBookmark;
