import { useQuery } from '@tanstack/react-query';
import instance from 'api/instance';
import { PostsDataType } from 'interface/posts';
import { useEffect } from 'react';
import { postDetailKey } from 'react-query-key/post.keys';
import { toast } from 'react-toastify';

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

  useEffect(() => {
    if (error) {
      toast.error('게시글을 불러오는데 실패했습니다.');
    }
  }, [error]);

  return { data, isLoading, error };
};

export default useFetchPostDetail;
