import { atom } from 'recoil';
import { IAlertAtoms } from '../interface/alert';

export const alertAtomsState = atom<IAlertAtoms>({
  key: 'alertAtomsState',
  default: { text: '', alertType: '' },
});
