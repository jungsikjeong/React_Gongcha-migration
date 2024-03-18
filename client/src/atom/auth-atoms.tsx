import { atom, selector } from 'recoil';
import { fetchUserInfo } from '../api/auth';
import { IUserInfo } from '../interface/auth';

export const authState = atom<IUserInfo | null>({
  key: 'authState',
  default: JSON.parse((localStorage.getItem('user') as string) ?? null),
});

export const getUserInfo = selector({
  key: 'getUserInfo',
  get: async ({ get }) => {
    const res = await fetchUserInfo();

    return res;
  },
});
