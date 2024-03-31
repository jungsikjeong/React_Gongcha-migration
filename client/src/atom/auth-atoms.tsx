import { atom } from 'recoil';

// 유저 인증
export const authState = atom<any>({
  key: 'authState',
  default: JSON.parse((localStorage.getItem('user') as string) ?? null),
});
