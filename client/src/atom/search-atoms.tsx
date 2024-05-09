import { atom } from 'recoil';

export const searchState = atom<string | null>({
  key: 'search',
  default: null,
});
