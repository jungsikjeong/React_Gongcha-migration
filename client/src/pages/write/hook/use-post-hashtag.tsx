import { useMutation } from '@tanstack/react-query';
import instance from 'api/instance';
import { toast } from 'react-toastify';

interface IPostHashtagProps {
  tags: string[];
  postId: string;
}

const postHashTag = async ({ tags, postId }: IPostHashtagProps) => {
  const res = await instance.post('/api/hashtag', {
    tags: tags,
    postId: postId,
  });

  return res;
};

const usePostHashTag = () => {
  return useMutation({
    mutationFn: postHashTag,
    mutationKey: ['postHashTag'],

    onSuccess: (data) => {},
    onError: (error: any) => {
      console.log('error:', error);
      toast.error('게시물 작성 중 오류가 발생했습니다.');
    },
  });
};

export default usePostHashTag;
