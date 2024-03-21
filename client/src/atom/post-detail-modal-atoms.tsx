import { atom } from 'recoil';

// 게시글 상세페이지 모달창
export const postDetailModalStatus = atom<boolean>({
  key: 'postDetailModalStatus',
  default: false,
});
