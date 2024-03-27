import { toast } from 'react-toastify';
import instance from './instance';

export const postImageUpload = async ({ formData }: { formData: FormData }) => {
  try {
    const res = await instance.post('/api/posts/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(res);

    return res;
  } catch (error: any) {
    const message = error?.response?.data?.msg;

    toast.error(message || '다시 시도해주세요');
  }
};
