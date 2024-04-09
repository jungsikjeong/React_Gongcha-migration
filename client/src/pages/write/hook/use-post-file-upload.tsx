import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from 'utils/token.localstorage';

import { toast } from 'react-toastify';

const postImageUpload = async ({ formData }: { formData: FormData }) => {
  const token = getToken();

  const res = await axios.post<string[]>('/api/posts/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

const usePostFIleUpload = () => {
  const navigation = useNavigate();

  return useMutation({
    mutationFn: postImageUpload,
    mutationKey: ['file-upload'],

    onSuccess: (data) => {},
    onError: (error: any) => {
      console.log(error);
      if (error?.response?.status === 401) {
        // window.location.reload();
      }

      toast.error('파일 업로드중 에러가 발생했습니다. 다시 시도해주세요');
    },
  });
};

export default usePostFIleUpload;
