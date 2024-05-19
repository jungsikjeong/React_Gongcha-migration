import { useCallback, useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { useUser } from 'hook/auth/use-user';
import useFetchPostBookmark from 'pages/post-detail/hook/use-fetch-post-bookmark';
import useFetchPostDetail from 'pages/post-detail/hook/use-fetch-post-detail';
import useFetchPostLike from 'pages/post-detail/hook/use-fetch-post-like';
import useFetchCommentList from '../../hook/comments/use-fetch-comment-list';

import FlexBox from 'components/common/flex-box';
import NotFound from 'components/not-found';
import PostDetailContentsMobile from './post-detail-contents/post-detail-contents-mobile';
import PostDetailContentsPC from './post-detail-contents/post-detail-contents-pc';

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
    scale: 0;
  }
  50% {
    opacity: 1;
    scale: 1.1;
  }
  100%{
    scale: 1;
  }
  `;

const EntireArea = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-height: 100vh;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
  overflow: hidden;
  animation: ${fadeInAnimation} 0.3s ease-in-out;

  @media (max-width: 768px) {
    align-items: start;
    overflow-y: scroll;
  }
`;

const Wrapper = styled.div<{ $boxheight: number }>`
  max-width: calc(100% - 64px - 64px);
  max-height: calc(100vh - 150px);
  height: ${({ $boxheight }) => `${$boxheight}px`};
  transition: all 0.3s ease;
  border: 1px solid rgb(38, 38, 38);

  @media (max-width: 768px) {
    max-width: initial;
    max-height: initial;
    width: 100%;
    height: 100%;
  }
`;

const Close = styled.div`
  position: absolute;
  right: 30px;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  @media (max-width: 768px) {
    display: none;
  }
`;

const PostDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [boxHeight, setBoxHeight] = useState(window.innerWidth / 1.5);

  const { user } = useUser();

  const {
    data: post,
    isLoading: postLoading,
    error,
  } = useFetchPostDetail(params.id as string);
  const { data: isPostLike } = useFetchPostLike(params.id as string);
  const { data: isBookmark } = useFetchPostBookmark(params.id as string);
  const {
    data: commentListResponse,
    isLoading: commentListLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchCommentList(params.id as string);
  const divRef = useRef<HTMLDivElement>(null);

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();

    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    // 모달이 열릴 때 배경 스크롤 비활성화
    document.body.style.overflow = 'hidden';

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        navigate(-1);
      }
    };
    const handleOutsideClose = (e: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        navigate(-1);
      }
    };

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setBoxHeight(window.innerWidth / 1.875);
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleOutsideClose);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      // 모달이 닫힐 때 body에 추가한 overflow: hidden 스타일 제거
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleOutsideClose);
      document.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (error) {
    return <NotFound />;
  }

  return (
    <EntireArea>
      <Container>
        <Wrapper $boxheight={boxHeight} ref={divRef}>
          <FlexBox $justifyContent='center' style={{ height: '100%' }}>
            <Close
              onClick={() => {
                navigate(-1);
              }}
            >
              <IoMdClose />
            </Close>

            {isMobile ? (
              <PostDetailContentsMobile
                post={post}
                commentListResponse={commentListResponse}
                commentListLoading={commentListLoading}
                postLoading={postLoading}
                user={user}
                isPostLike={isPostLike}
                isBookmark={isBookmark}
              />
            ) : (
              <PostDetailContentsPC
                post={post}
                user={user}
                commentListResponse={commentListResponse}
                commentListLoading={commentListLoading}
                postLoading={postLoading}
                fetchNext={fetchNext}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                isPostLike={isPostLike}
                isBookmark={isBookmark}
              />
            )}
          </FlexBox>
        </Wrapper>
      </Container>
    </EntireArea>
  );
};

export default PostDetailPage;
