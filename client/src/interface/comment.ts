import { AuthorType } from './auth';

type LikeTypes = {
  _id: string;
  post?: string;
  user: string;
};
type ParentCommentUserTypes = {
  _id: string;
  nickname: string;
};

export type CommentReplyTypes = {
  _id: string;
  parentComment: string;
  parentCommentUser: ParentCommentUserTypes;
  contents: string;
  likes: LikeTypes[];
  user: AuthorType;
};

export interface IComment {
  user: AuthorType;
  post: string;
  contents: string;
  date: string;
  likes?: LikeTypes[];
  commentReplyCount: number;
  __v: number;
  _id: string;
}
