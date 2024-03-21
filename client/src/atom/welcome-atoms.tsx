import { atom } from 'recoil';

// 초기 회원가입시 나타나는 modal창 status
export const welcomeState = atom<boolean>({
  key: 'welcomeState',
  default: false,
});
