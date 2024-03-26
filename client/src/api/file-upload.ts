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
    console.log(error);
  }
};
