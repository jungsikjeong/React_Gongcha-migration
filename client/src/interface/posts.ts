import { AuthorType } from './auth';

export type PostsDataType = {
  author: AuthorType;
  className?: string;
  contents: string;
  date: string;
  images: string[];
  hashtags: string[];
  postCommentCount: number;
  postLikeCount: number;
  __v: number;
  _id: string;
};

export interface IPostsResponse {
  page: number;
  posts: PostsDataType[];
  totalCount: number;
  totalPage: number;
}
