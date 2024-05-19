import { useCallback, useEffect, useRef, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useIntersectionObserver from 'hook/use-intersection-observer';
import { formattedNumber } from 'utils/formatted-number';
import useFetchMyPosts from '../hook/use-fetch-my-posts';

import FlexBox from 'components/common/flex-box';
import SkeletonBox from 'components/common/skeleton/skeleton-box';
import Typography from 'components/common/typography';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
`;

const Box = styled.div`
  position: relative;
  &:hover .hover-box {
    opacity: 1;
  }
`;

const HoverBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;

  .icons {
    font-size: 30px;
    margin-right: 2px;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  .chat-icon {
    font-size: 25px;
    transform: scaleX(-1);
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  span {
    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  cursor: pointer;
`;

const Spinner = styled.div`
  width: 100%;
  max-width: 935px;
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: center;
`;

const SKELETONS = Array(10).fill(0);

const MyPagePosts = () => {
  const [isHovered, setIsHovered] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting; // 페이지 끝에도달

  const {
    data: postsResponse,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchMyPosts();

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();

    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;

    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [fetchNext, isPageEnd, hasNextPage]);

  if (
    !isLoading &&
    postsResponse &&
    postsResponse?.pages[0]?.posts?.length === 0
  ) {
    return (
      <Typography tag='p' paddingTop='5rem' textAlign='center'>
        아직 작성한 게시물이 없습니다.
      </Typography>
    );
  }
  const t = true;
  return (
    <Container>
      {t ? (
        SKELETONS.map((data, index) => (
          <SkeletonBox width='100%' height='350px' key={index} />
        ))
      ) : (
        <>
          {postsResponse?.pages?.map((data) =>
            data?.posts?.map((post) => (
              <Link to={`/post/${post?._id}`} key={post._id}>
                <Box
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Img src={post?.images?.[0]} alt='post-img' />
                  {isHovered && (
                    <HoverBox className='hover-box'>
                      <FlexBox
                        style={{ width: '100%', height: '100%' }}
                        $alignItems='center'
                        $justifyContent='center'
                        $gap='4px'
                      >
                        {/* 좋아요 */}
                        <CiHeart className='icons' />{' '}
                        <span>{formattedNumber(post?.postLikeCount || 0)}</span>
                        {/* 댓글 */}
                        <IoChatbubbleOutline className='icons chat-icon' />
                        <span>
                          {formattedNumber(post?.postCommentCount || 0)}
                        </span>
                      </FlexBox>
                    </HoverBox>
                  )}
                </Box>
              </Link>
            ))
          )}
        </>
      )}
      {(isFetching || isFetchingNextPage) && (
        <Spinner>
          <img src='/spinner.svg' alt='loading' className='spinner' />
        </Spinner>
      )}

      <div
        ref={ref}
        style={{
          height: '40px',
          width: '100%',
          marginBottom: '40px',
        }}
      />
    </Container>
  );
};

export default MyPagePosts;
