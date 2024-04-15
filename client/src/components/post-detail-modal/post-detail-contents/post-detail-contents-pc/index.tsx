import { PostsDataType } from 'interface/posts';
import { useRef } from 'react';
import { CiBookmark } from 'react-icons/ci';
import { FaShare } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa6';
import { FcLike } from 'react-icons/fc';
import { SlHeart, SlSpeech } from 'react-icons/sl';
import styled from 'styled-components';

import CommentForm from 'components/comments/comment-form';
import PostDetailImages from 'components/post-detail-modal/post-detail-images';
import CommentList from '../../../comments/comment-list';

const Container = styled.div`
  /* max-width: 335px; */
  min-width: 335px;
  background-color: black;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid rgb(38, 38, 38);

  .user-nickname {
    font-size: 14px;
    line-height: 18px;
    font-weight: 600;
  }

  .user-image {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    margin-right: 10px;
  }

  .icon {
    margin-left: auto;
    cursor: pointer;
  }
`;
const ContentsWrap = styled.ul`
  height: calc(100% - 200px);
  margin: 0;
  overflow-y: scroll;
  padding: 16px;
  scrollbar-width: none;
  background-color: black;
`;

const ContentsItem = styled.li`
  display: flex;
  align-items: start;
`;

const UserImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 10px;
`;

const Post = styled.div`
  width: 100%;
  max-width: 335px;
  font-size: 14px;
  line-height: 18px;
  gap: 5px;
`;

const Tag = styled.span`
  color: rgb(224, 241, 255);
`;

const Footer = styled.div`
  width: 100%;
  border-top: 1px solid rgb(38, 38, 38);
  padding: 6px 16px 8px;
  background-color: black;
  span {
    cursor: pointer;
    padding-top: 6px;
    font-size: 14px;
    color: rgb(245, 245, 245);
    line-height: 18px;
    font-weight: 600;
  }
`;

const Section = styled.section`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 23px;
  color: rgb(245, 245, 245);

  .bookmark {
    margin-left: auto;
  }

  .section-icons {
    cursor: pointer;
  }
`;

interface IPostDetailContents {
  post: PostsDataType | undefined;
}

const PostDetailContentsPC = ({ post }: IPostDetailContents) => {
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const test = false;

  const handleCommentFocus = () => {
    if (commentRef.current) {
      commentRef.current.focus();
    }
  };

  return (
    <>
      <PostDetailImages url={post?.images} />
      <Container>
        <User>
          <UserImage src={post?.author?.avatar} alt='userImage' />

          <div className='user-nickname'>{post?.author?.nickname}</div>

          <div className='icon'>
            <FaShare />
          </div>
        </User>

        <ContentsWrap>
          <ContentsItem>
            <UserImage src={post?.author?.avatar} alt='userImage' />

            <Post>
              <b>{post?.author?.nickname}</b>{' '}
              <div
                dangerouslySetInnerHTML={{ __html: post?.content || '' }}
              ></div>
              <Tag>#MiuMiu </Tag>
              <Tag>#MiuCrew </Tag>
              <Tag>#미우미우 </Tag>
              <Tag>#광고</Tag>
            </Post>
          </ContentsItem>

          <>
            <CommentList />
            <CommentList />
            <CommentList />
            <CommentList />
            <CommentList />
            <CommentList />
            <CommentList />
            <CommentList />
            <CommentList />
            <CommentList />
            <CommentList />
          </>
        </ContentsWrap>
        <Footer>
          <Section>
            <div className='section-icons'>
              {test ? <FcLike /> : <SlHeart />}
            </div>

            <div className='section-icons' onClick={handleCommentFocus}>
              <SlSpeech />
            </div>

            <div className='bookmark section-icons'>
              {test ? <FaBookmark /> : <CiBookmark />}
            </div>
          </Section>

          <span>좋아요 9.4만개</span>

          <CommentForm />
        </Footer>
      </Container>
    </>
  );
};

export default PostDetailContentsPC;
