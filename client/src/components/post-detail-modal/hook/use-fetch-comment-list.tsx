import { useQuery } from '@tanstack/react-query';
import instance from 'api/instance';
import { IComment } from 'interface/comment';
import { useEffect } from 'react';
import { commentKey } from 'react-query-key/comment.keys';
import { toast } from 'react-toastify';

const fetchCommentList = async (id: string) => {
  const res = await instance.get<IComment[]>(`/api/comment/${id}`);

  return res.data;
};

const useFetchCommentList = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [commentKey.comment, id],
    queryFn: () => fetchCommentList(id),
    refetchOnWindowFocus: false,
    staleTime: 15000,
  });

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error('댓글을 불러오는데 실패했습니다.');
    }
  }, [error]);

  return { data, isLoading, error };
};

export default useFetchCommentList;
