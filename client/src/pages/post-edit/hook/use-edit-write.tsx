import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from 'api/instance';
import { myPageKey } from 'react-query-key/my-page-keys';
import { postDetailKey, postsKey } from 'react-query-key/post.keys';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import useEditHashTag from './use-edit-hashtag';

interface IEditWriteProps {
  value: string;
  fileInfo: string[];
  postId: string;
}

interface IUseEditWriteProps {
  tags: string[];
}

const editWrite = async ({ value, fileInfo, postId }: IEditWriteProps) => {
  const res = await instance.put('/api/posts', {
    content: value,
    images: fileInfo,
    postId: postId,
  });

  return res.data;
};

const useEditWrite = ({ tags }: IUseEditWriteProps) => {
  const navigate = useNavigate();

  const { mutate: editHashtag } = useEditHashTag();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editWrite,
    mutationKey: ['editWrite'],

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [postsKey.posts],
        refetchType: 'all',
      });
      queryClient.invalidateQueries({
        queryKey: [postDetailKey.post, data?._id],
        refetchType: 'all',
      });
      queryClient.invalidateQueries({
        queryKey: [myPageKey.myPosts],
        refetchType: 'all',
      });

      const postId = data?._id;

      if (tags.length !== 0 && postId) {
        editHashtag({ tags, postId });
      }

      toast.success('게시물이 수정되었습니다.');
      navigate(`/post/${data?._id}`);
    },
    onError: (error: any) => {
      console.log('error:', error);
      toast.error('게시물 수정 중 오류가 발생했습니다.');
    },
  });
};

export default useEditWrite;
