import instance from './instance';

interface IPostWrite {
  value: string;
  fileInfo: string[];
}

export const postWrite = async ({ value, fileInfo }: IPostWrite) => {
  try {
    const res = await instance.post('/api/posts', {
      content: value,
      images: fileInfo,
    });

    return res;
  } catch (error: any) {
    console.log(error);
  }
};
