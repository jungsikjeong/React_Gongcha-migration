import { atom } from 'recoil';
import { IAlertAtoms } from '../interface/alert';

// 경고모달창 status
export const alertAtomsState = atom<IAlertAtoms>({
  key: 'alertAtomsState',
  default: { text: '', alertType: '' },
});
