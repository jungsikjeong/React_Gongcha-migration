import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from 'api/instance';
import { postsKey } from 'react-query-key/post.key';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IPostWrite {
  value: string;
  fileInfo: string[];
}

const postWrite = async ({ value, fileInfo }: IPostWrite) => {
  const res = await instance.post('/api/posts', {
    content: value,
    images: fileInfo,
  });

  return res;
};

const usePostWrite = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postWrite,
    mutationKey: ['postWrite'],

    onSuccess: (data) => {
      queryClient.setQueryData([postsKey.posts], data);
      toast.success('게시물이 작성되었습니다.');
      navigate('/posts');
    },
    onError: (error: any) => {
      console.log('error:', error);
    },
  });
};

export default usePostWrite;
