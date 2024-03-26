import { FileObjectType } from 'interface/file-object-type';
import instance from './instance';

interface IPostWrite {
  value: string;
  fileObject: FileObjectType;
}

export const postWrite = async ({ value, fileObject }: IPostWrite) => {
  try {
    const res = await instance.post('/api/posts', {
      content: value,
      images: fileObject,
    });
    console.log(res);
    return res;
  } catch (error: any) {
    console.log(error);
  }
};
