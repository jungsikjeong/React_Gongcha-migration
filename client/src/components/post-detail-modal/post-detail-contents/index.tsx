import { PostsDataType } from 'interface/posts';

import PostDetailContentsMobile from './post-detail-contents-mobile';
import PostDetailContentsPC from './post-detail-contents-pc';

interface IPostDetailContents {
  isMobile: boolean;
  post: PostsDataType | undefined;
}

const PostDetailContents = ({ isMobile, post }: IPostDetailContents) => {
  return (
    <>
      {isMobile ? (
        <PostDetailContentsMobile post={post} />
      ) : (
        <PostDetailContentsPC post={post} />
      )}
    </>
  );
};

export default PostDetailContents;
