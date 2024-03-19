import { atom } from 'recoil';

export const welcomeState = atom<boolean>({
  key: 'welcomeState',
  default: false,
});
