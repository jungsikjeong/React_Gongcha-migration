import { PostsDataType } from 'interface/posts';
import { cardSizeRandomFn } from 'utils/card-size-random';
import instance from './instance';

interface IPostsResponse {
  page: number;
  posts: PostsDataType[];
  totalCount: number;
  totalPage: number;
}

export const fetchPosts = async (pageParam: number, searchParams: string) => {
  const res = await instance.get<IPostsResponse>(
    '/api/posts?/page=' + pageParam,
    {
      params: {
        limit: 20,
        page: pageParam,
        searchParams,
      },
    }
  );

  const newResData = { ...res?.data };

  const newData: PostsDataType[] = [];

  res?.data?.posts.map((item) =>
    newData.push({ ...item, className: cardSizeRandomFn() })
  );
  newResData.posts = newData;

  return newResData;
};
