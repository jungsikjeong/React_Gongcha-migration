import { AuthorType } from './auth';

type LikeTypes = {
  _id: string;
  post?: string;
  user: string;
};
export type CommentReplyTypes = {
  _id: string;
  parentComment: string;
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
