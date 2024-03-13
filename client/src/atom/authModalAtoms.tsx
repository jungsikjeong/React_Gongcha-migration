import { atom } from 'recoil';

export const authModalState = atom<boolean>({
  key: 'authModalState',
  default: false,
});
