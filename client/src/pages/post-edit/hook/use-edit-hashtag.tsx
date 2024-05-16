import { useMutation } from '@tanstack/react-query';
import instance from 'api/instance';

interface IPostHashtagProps {
  tags: string[];
  postId: string;
}

const postHashTag = async ({ tags, postId }: IPostHashtagProps) => {
  const res = await instance.put('/api/hashtag', {
    tags: tags,
    postId: postId,
  });

  return res;
};

const usePostHashTag = () => {
  return useMutation({
    mutationFn: postHashTag,
    mutationKey: ['editHashTag'],

    onSuccess: (data) => {},
    onError: (error: any) => {
      console.log('error:', error);
    },
  });
};

export default usePostHashTag;
