type AuthorType = {
  avatar: string;
  nickname: string;
  _id: string;
};

export type PostsDataType = {
  author: AuthorType;
  className?: string;
  commentsCount: number;
  content: string;
  date: string;
  images: string[];
  postLikeCount: number;
  __v: number;
  _id: string;
};
