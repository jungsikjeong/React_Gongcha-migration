import { PostsDataType } from 'interface/posts';
import { useEffect } from 'react';
import { FaShare } from 'react-icons/fa';
import styled from 'styled-components';

const Button = styled.div`
  margin-left: auto;
  cursor: pointer;
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
    <>
      <Button
        onClick={() => {
          shareKakao();
        }}
      >
        <FaShare />
      </Button>
    </>
  );
};

export default PostShare;
