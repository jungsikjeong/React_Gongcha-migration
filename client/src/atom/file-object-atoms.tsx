import { FileObjectType } from 'interface/file-object-type';
import { atom } from 'recoil';

export const fileObjectState = atom<FileObjectType>({
  key: 'fileObjectState',
  default: [],
});
