import { AuthorType } from './auth';

export type PostsDataType = {
  author: AuthorType;
  className?: string;
  contents: string;
  date: string;
  images: string[];
  postLikeCount: number;
  __v: number;
  _id: string;
};
