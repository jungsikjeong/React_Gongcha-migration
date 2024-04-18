import { atom } from 'recoil';

interface IAlertModalState {
  text: string;
  confirm: boolean;
}

export const alertModalState = atom<IAlertModalState>({
  key: 'alertModalState',
  default: {
    text: '',
    confirm: false,
  },
});
