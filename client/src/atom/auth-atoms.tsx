import { atom } from 'recoil';
import { IUserInfo } from '../interface/auth';

// 유저 인증
export const authState = atom<IUserInfo | null>({
  key: 'authState',
  default: JSON.parse((localStorage.getItem('user') as string) ?? null),
});
