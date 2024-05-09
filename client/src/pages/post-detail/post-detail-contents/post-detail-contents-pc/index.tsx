import { InfiniteData } from '@tanstack/react-query';
import { formatDistance } from 'date-fns';
import ko from 'date-fns/locale/ko';
import { IUserInfo } from 'interface/auth';
import { ICommentResponse } from 'interface/comment';
import { PostsDataType } from 'interface/posts';
import { CiBookmark } from 'react-icons/ci';
import { FaBookmark } from 'react-icons/fa6';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { LuPlusCircle } from 'react-icons/lu';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { commentFormStatus } from 'atom/comment-atoms';
import usePostBookmark from 'pages/post-detail/hook/use-post-bookmark';
import usePostLikePost from 'pages/post-detail/hook/use-post-like-post';

import CommentForm from 'components/comments/comment-form';
import CommentList from 'components/comments/comment-list';
import CommentSkeleton from 'components/comments/comment-skeleton';
import FlexBox from 'components/common/flex-box';
import PostDetailImages from 'pages/post-detail/post-detail-images';
import PostDetailLike from 'pages/post-detail/post-detail-like';
import PostShare from '../post-share';

const Container = styled.div`
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
`;
const ContentsWrap = styled.ul`
  height: calc(100% - 200px);
  margin: 0;
  overflow-y: scroll;
  padding: 16px;
  scrollbar-width: none;
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
  display: flex;
  width: 100%;
  max-width: 335px;
  font-size: 14px;
  line-height: 18px;
  gap: 5px;
`;

const Footer = styled.div`
  width: 100%;
  border-top: 1px solid rgb(38, 38, 38);
  padding: 6px 16px 8px;
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

const Time = styled.div`
  color: rgb(168, 168, 168);
  font-size: 12px;
`;

interface IPostDetailContents {
  post: PostsDataType | undefined;
  commentListResponse: InfiniteData<ICommentResponse, unknown> | undefined;
  commentListLoading: boolean;
  postLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNext: () => Promise<void>;
  user: IUserInfo | null | undefined;
  isPostLike: boolean | undefined;
  isBookmark: boolean | undefined;
}

const skeletons = Array(12).fill(0);

const PostDetailContentsPC = ({
  user,
  post,
  commentListResponse,
  commentListLoading,
  postLoading,
  fetchNext,
  hasNextPage,
  isFetchingNextPage,
  isPostLike,
  isBookmark,
}: IPostDetailContents) => {
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
      <PostDetailImages postLoading={postLoading} url={post?.images} />
      <Container>
        {postLoading ? (
          <CommentSkeleton />
        ) : (
          <User>
            <UserImage src={post?.author?.avatar} alt='userImage' />

            <div className='user-nickname'>{post?.author?.nickname}</div>

            {/* 공유하기 버튼 */}
            <PostShare post={post} />
          </User>
        )}

        <ContentsWrap>
          {postLoading ? (
            <CommentSkeleton />
          ) : (
            <ContentsItem>
              <UserImage src={post?.author?.avatar} alt='userImage' />

              <Post>
                <b>{post?.author?.nickname}</b>
                <div
                  dangerouslySetInnerHTML={{ __html: post?.contents || '' }}
                ></div>
              </Post>
            </ContentsItem>
          )}

          <FlexBox $direction='column'>
            {commentListLoading ? (
              <>
                {skeletons.map((_, index) => (
                  <div key={index}>
                    <CommentSkeleton />
                  </div>
                ))}
              </>
            ) : (
              // 댓글 리스트
              <>
                {commentListResponse?.pages?.map((data) =>
                  data?.commentList?.map((comment) => (
                    <CommentList
                      postId={post?._id}
                      comment={comment}
                      key={comment._id}
                    />
                  ))
                )}

                {/* 더보기 버튼 눌렀을 시 로딩 */}
                {isFetchingNextPage ? (
                  <img src='/spinner.svg' alt='loading' className='spinner' />
                ) : (
                  // 더보기 버튼
                  <>
                    {hasNextPage && (
                      <div onClick={() => fetchNext()}>
                        <FlexBox
                          $justifyContent='center'
                          $alignItems='center'
                          style={{
                            minHeight: '40px',
                            fontSize: '20px',
                            marginTop: '10px',
                            cursor: 'pointer',
                          }}
                        >
                          <LuPlusCircle />
                        </FlexBox>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </FlexBox>
        </ContentsWrap>

        <Footer>
          <Section>
            {/* 게시글 좋아요 */}
            <PostDetailLike
              handlePostLike={handlePostLike}
              isPostLike={isPostLike}
            />

            <div
              className='section-icons'
              onClick={() => setCommentFormStatus(true)}
            >
              <IoChatbubbleOutline />
            </div>

            {/* 게시글 북마크 */}
            <div
              className='bookmark section-icons'
              onClick={handlePostBookmark}
            >
              {isBookmark ? <FaBookmark /> : <CiBookmark />}
            </div>
          </Section>
          <span>
            좋아요{' '}
            {new Intl.NumberFormat('ko-KR').format(
              (post?.postLikeCount as number) || 0
            )}
            개
          </span>{' '}
          <br />
          <Time>
            {post &&
              formatDistance(new Date(), new Date(post.date), {
                locale: ko as any,
              })}
            전
          </Time>
          {/* 댓글 작성 폼 */}
          <CommentForm post={post} />
        </Footer>
      </Container>
    </>
  );
};

export default PostDetailContentsPC;
