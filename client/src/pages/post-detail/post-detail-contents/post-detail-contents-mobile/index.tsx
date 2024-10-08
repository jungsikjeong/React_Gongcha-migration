import { InfiniteData } from '@tanstack/react-query';
import { formatDistance } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { IUserInfo } from 'interface/auth';
import { ICommentResponse } from 'interface/comment';
import { PostsDataType } from 'interface/posts';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { CiBookmark } from 'react-icons/ci';
import { FaBookmark } from 'react-icons/fa6';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { commentFormStatus } from 'atom/comment-atoms';
import usePostBookmark from 'pages/post-detail/hook/use-post-bookmark';

import CommentSkeleton from 'components/comments/comment-skeleton';
import FlexBox from 'components/common/flex-box';
import VariousModal from 'components/common/modal/various-modal';
import PostHeader from 'components/common/post-header';
import usePostLikePost from 'pages/post-detail/hook/use-post-like-post';
import PostDetailImages from 'pages/post-detail/post-detail-images';
import PostDetailLike from 'pages/post-detail/post-detail-like';

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

const Icon = styled.div`
  cursor: pointer;
  margin-left: auto;
`;

interface IPostDetailContents {
  post: PostsDataType | undefined;
  commentListResponse: InfiniteData<ICommentResponse, unknown> | undefined;
  commentListLoading: boolean;
  postLoading: boolean;
  user: IUserInfo | null | undefined;
  isPostLike: boolean | undefined;
  isBookmark: boolean | undefined;
}

const PostDetailContentsMobile = ({
  user,
  post,
  commentListResponse,
  commentListLoading,
  postLoading,
  isPostLike,
  isBookmark,
}: IPostDetailContents) => {
  const [isVariousModalOpen, setIsVariousModalOpen] = useState(false);
  const setCommentFormStatus = useSetRecoilState(commentFormStatus);

  const { mutate: updateLike } = usePostLikePost(post?._id as string, user);
  const { mutate: updateBookmark } = usePostBookmark(post?._id as string, user);

  const handlePostLike = () => {
    if (!user) {
      toast.warning('로그인이 필요한 서비스입니다.');
    } else {
      updateLike({ postId: post?._id as string });
    }
  };

  const handlePostBookmark = () => {
    if (!user) {
      toast.warning('로그인이 필요한 서비스입니다.');
    } else {
      updateBookmark({ postId: post?._id as string });
    }
  };
  return (
    <>
      {isVariousModalOpen && (
        <VariousModal
          text='삭제하기'
          text2='수정하기'
          post={post}
          handleCancel={() => setIsVariousModalOpen(false)}
        />
      )}

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

              <Icon onClick={() => setIsVariousModalOpen(true)}>
                <BsThreeDots />
              </Icon>
            </>
          )}
        </User>

        {/* 게시글 이미지 */}
        <PostDetailImages url={post?.images} postLoading={postLoading} />

        <ContentsWrap>
          <ContentsItem>
            <Section>
              {/* 게시글 좋아요 */}
              <PostDetailLike
                handlePostLike={handlePostLike}
                isPostLike={isPostLike}
              />

              <Link
                to={`/${post?._id}/commentList`}
                onClick={() => setCommentFormStatus(true)}
              >
                <div className='section-icons'>
                  <IoChatbubbleOutline />
                </div>
              </Link>

              <div
                className='bookmark section-icons'
                onClick={handlePostBookmark}
              >
                {isBookmark ? <FaBookmark /> : <CiBookmark />}
              </div>
            </Section>

            <Post>
              <b>
                좋아요{' '}
                {new Intl.NumberFormat('ko-KR').format(
                  (post?.postLikeCount as number) || 0
                )}
                개
              </b>
              <br />
              <FlexBox>
                <span>
                  <b>{post?.author?.nickname} </b>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: post?.contents || '',
                    }}
                  ></span>
                </span>
              </FlexBox>
            </Post>
          </ContentsItem>

          <Link to={`/${post?._id}/commentList`}>
            <Bottom>
              댓글 {commentListResponse?.pages[0].totalCount}개 모두 보기
            </Bottom>
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
    </>
  );
};

export default PostDetailContentsMobile;
