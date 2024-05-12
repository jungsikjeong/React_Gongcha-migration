import { PostsDataType } from 'interface/posts';
import { useEffect } from 'react';
import styled from 'styled-components';

import Button from 'components/common/button';

const StyledButton = styled(Button)`
  font-weight: 700;
  background-color: rgb(38, 38, 38);
  width: 250px;
  min-height: 48px;
  padding: 4px 8px;
  border-bottom: 1px solid rgb(54, 54, 54);
  transition: all 0.3s ease;

  &:hover {
    background-color: rgb(29, 29, 29);
  }
`;

declare global {
  interface Window {
    Kakao: any;
  }
}

const { Kakao } = window;

interface IPostShareProps {
  post: PostsDataType | undefined;
}

const PostShare = ({ post }: IPostShareProps) => {
  const shareKakao = () => {
    if (post) {
      Kakao.Share.sendCustom({
        templateId: 107624,
        templateArgs: {
          post_id: `post/${post?._id}`,
          avatar: `${post?.author?.avatar}`,
          nickname: `${post?.author?.nickname}`,
          postImg: `${post?.images[0]}`,
          contents: `${
            post?.contents
              ? post?.contents.replace(/<[^>]*>?/gm, '')
              : '#공차 #하이!'
          }`,
          like: `${post?.postLikeCount}`,
          commentCount: `${post?.postCommentCount}`,
        },
      });
    }
  };

  useEffect(() => {
    if (window.Kakao) {
      window.Kakao.cleanup();

      window.Kakao.init(process.env.REACT_APP_API_KAKAO_SHARE_KEY);
      // 잘 적용되면 true를 리턴함
      //   console.log(window.Kakao.isInitialized());
    }
  }, []);

  return (
    <StyledButton
      type='button'
      onClick={() => {
        shareKakao();
      }}
    >
      공유하기
    </StyledButton>
  );
};

export default PostShare;
