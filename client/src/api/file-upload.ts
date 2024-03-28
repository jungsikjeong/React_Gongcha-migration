import { toast } from 'react-toastify';
import instance from './instance';

export const postImageUpload = async ({ formData }: { formData: FormData }) => {
  try {
    const { data } = await instance.post<string[]>(
      '/api/posts/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return data;
  } catch (error: any) {
    const message = error?.response?.data?.msg;

    toast.error(message || '다시 시도해주세요');
  }
};
