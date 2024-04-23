import { atom } from 'recoil';

type ReplyCommentUserType = {
  userId: string;
  commentId: string;
  nickName: string;
};

// 댓글 아이콘 눌렀을 때  댓글 form에 포커스 주기위한 recoil
export const commentFormStatus = atom<boolean>({
  key: 'commentFormStatus',
  default: false,
});
// 댓글에 답글 달때 댓글 form에 포커스 주기위한 recoil
export const replyCommentStatus = atom<boolean>({
  key: 'replyCommentStatus',
  default: false,
});

// 댓글에 답글 달때 댓글 form에 답글 다는 사람 닉네임 얹기위한 recoil
export const replyCommentUserStatus = atom<ReplyCommentUserType>({
  key: 'replyCommentUserStatus',
  default: {
    userId: '',
    commentId: '',
    nickName: '',
  },
});
