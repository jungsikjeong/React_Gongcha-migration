import { AuthorType } from './auth';

export type PostsDataType = {
  post: {
    author: AuthorType;
    className?: string;
    contents: string;
    images: string[];
    postCommentCount: number;
    postLikeCount: number;
    _id: string;
  };
  _id: string;
};

export interface IBookmarkResponse {
  page: number;
  posts: PostsDataType[];
  totalCount: number;
  totalPage: number;
}
