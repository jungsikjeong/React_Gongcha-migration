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

type CommentListTypes = {
  commentList: IComment[];
  page: number;
  totalCount: number;
  totalpage: number;
};

export interface ICommentReplyResponse {
  page: number;
  commentReply: CommentReplyTypes[];
  totalCount: number;
  totalPage: number;
}

export interface CommentReplyTypes {
  _id: string;
  parentComment: string;
  parentCommentUser: ParentCommentUserTypes;
  contents: string;
  likes: LikeTypes[];
  user: AuthorType;
}

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

export interface ICommentResponse {
  page: number;
  commentList: IComment[];
  totalCount: number;
  totalPage: number;
}

export interface ICommentList {
  pageParams: number[];
  pages: CommentListTypes[];
}
