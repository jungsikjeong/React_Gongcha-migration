import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from 'utils/token.localstorage';

export const postFileUpload = async ({ formData }: { formData: FormData }) => {
  try {
    const token = getToken();

    const res = await axios.post<string[]>('/api/posts/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      toast.error('업로드중 에러가 발생했습니다. 다시 시도해주세요');
      window.location.reload();
    }
  }
};

export const profileFileUpload = async ({
  formData,
}: {
  formData: FormData;
}): Promise<string> => {
  try {
    const token = getToken();

    const res = await axios.post<string>('/api/users/edit/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      toast.error('업로드중 에러가 발생했습니다. 다시 시도해주세요');
      window.location.reload();
    }
    return '';
  }
};
