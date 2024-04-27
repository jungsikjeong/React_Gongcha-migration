import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from 'api/instance';
import { postDetailKey } from 'react-query-key/post.key';
import { toast } from 'react-toastify';

interface IPostLikeProps {
  postId: string;
}
const postLikePost = async ({ postId }: IPostLikeProps) => {
  const res = await instance.put<string>(`/api/like/${postId}`);

  console.log(res.data);
  return res.data;
};

// 게시글 좋아요 뮤테이션
const usePostLikePost = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postLikePost,
    mutationKey: ['post-like'],

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [postDetailKey.post, postId],
        refetchType: 'all',
      });
    },
    onError: (error: any) => {
      console.log('error:', error);
      toast.error('에러가 발생했습니다. 다시 시도해주세요');
    },
  });
};

export default usePostLikePost;
