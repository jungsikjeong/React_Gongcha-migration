import { formatDistance } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { IComment } from 'interface/comment';
import { PostsDataType } from 'interface/posts';
import { CiBookmark } from 'react-icons/ci';
import { FaShare } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa6';
import { FcLike } from 'react-icons/fc';
import { SlHeart, SlSpeech } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import CommentSkeleton from 'components/comments/comment-skeleton';
import PostHeader from 'components/common/post-header';
import PostDetailImages from 'components/post-detail-modal/post-detail-images';

const Container = styled.div`
  min-width: 335px;
  width: 100%;
  background-color: black;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  padding-top: 3.5rem;

  .user-nickname {
    font-size: 14px;
    line-height: 18px;
    font-weight: 600;
  }

  .user-image {
    width: 32px;
    height: 32px;
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

  @media (max-width: 768px) {
    height: 150px;
    padding-top: 0;
    overflow-y: initial;
  }
`;

const ContentsItem = styled.li`
  display: flex;
  align-items: start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Post = styled.div`
  width: 100%;
  max-width: 335px;
  font-size: 14px;
  line-height: 18px;
  gap: 5px;

  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 12px;
  }
`;

const Tag = styled.span`
  color: rgb(224, 241, 255);
`;

const Section = styled.section`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 23px;
  color: rgb(245, 245, 245);
  width: 100%;
  padding: 0.2rem 0;
  .bookmark {
    margin-left: auto;
  }

  .section-icons {
    cursor: pointer;
  }
`;

const Bottom = styled.div`
  color: rgb(168, 168, 168);
  font-size: 12px;
`;

interface IPostDetailContents {
  post: PostsDataType | undefined;
  commentList: IComment[] | undefined;
  commentListLoading: boolean;
  postLoading: boolean;
}

const PostDetailContentsMobile = ({
  post,
  commentList,
  commentListLoading,
  postLoading,
}: IPostDetailContents) => {
  const test = false;

  return (
    <Container>
      <PostHeader text='게시물' />
      <User>
        {postLoading ? (
          <CommentSkeleton />
        ) : (
          <>
            <img
              className='user-image'
              src={post?.author?.avatar}
              alt='userImage'
            />

            <div className='user-nickname'>{post?.author?.nickname}</div>

            <div className='icon'>
              <FaShare />
            </div>
          </>
        )}
      </User>
      <PostDetailImages url={post?.images} postLoading={postLoading} />
      <ContentsWrap>
        <ContentsItem>
          <Section>
            <div className='section-icons'>
              {test ? <FcLike /> : <SlHeart />}
            </div>

            <Link to='/:id/commentList'>
              <div className='section-icons'>
                <SlSpeech />
              </div>
            </Link>

            <div className='bookmark section-icons'>
              {test ? <FaBookmark /> : <CiBookmark />}
            </div>
          </Section>

          <Post>
            <b>좋아요 24개</b>
            <br />
            <b>{post?.author?.nickname}</b>
            <div
              dangerouslySetInnerHTML={{ __html: post?.contents || '' }}
            ></div>
            <Tag>#MiuMiu </Tag>
            <Tag>#MiuCrew </Tag>
            <Tag>#미우미우 </Tag>
            <Tag>#광고</Tag>
          </Post>
        </ContentsItem>

        <Link to={`/${post?._id}/commentList`}>
          <Bottom>댓글 42개 모두 보기</Bottom>
        </Link>
        <Bottom>
          {post &&
            formatDistance(new Date(), new Date(post.date), {
              locale: ko as any,
            })}
          전
        </Bottom>
      </ContentsWrap>
    </Container>
  );
};

export default PostDetailContentsMobile;
