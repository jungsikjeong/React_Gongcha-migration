import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from 'api/instance';
import { myPageKey } from 'react-query-key/my-page-keys';
import { postsKey } from 'react-query-key/post.keys';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IPostWriteProps {
  value: string;
  fileInfo: string[];
  tags: string[];
}

const postWrite = async ({ value, fileInfo, tags }: IPostWriteProps) => {
  const res = await instance.post('/api/posts', {
    content: value,
    images: fileInfo,
    tags,
  });

  return res.data;
};

const usePostWrite = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postWrite,
    mutationKey: ['postWrite'],

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [postsKey.posts],
        refetchType: 'all',
      });
      queryClient.invalidateQueries({
        queryKey: [myPageKey.myPosts],
        refetchType: 'all',
      });

      toast.success('게시물이 작성되었습니다.');
      navigate('/posts');
    },
    onError: (error: any) => {
      console.log('error:', error);
      toast.error('게시물 작성 중 오류가 발생했습니다.');
    },
  });
};

export default usePostWrite;
