import { AuthorType } from './auth';

export interface IComment {
  author: AuthorType;
  post: string;
  contents: string;
  date: string;
  __v: number;
  _id: string;
}
