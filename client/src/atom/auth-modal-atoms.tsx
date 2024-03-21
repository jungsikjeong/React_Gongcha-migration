import { atom } from 'recoil';

// 회원가입 로그인 모달창
export const authModalState = atom<boolean>({
  key: 'authModalState',
  default: false,
});
