import { AuthorType } from './auth';

type LikeTypes = {
  _id: string;
  post?: string;
  user: string;
};

export interface IComment {
  user: AuthorType;
  post: string;
  contents: string;
  date: string;
  likes?: LikeTypes[];
  __v: number;
  _id: string;
}
