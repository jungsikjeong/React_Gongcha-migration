import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { fetchPosts } from 'api/fetch-posts';
import useIntersectionObserver from 'hook/use-intersection-observer';
import { postsKey } from 'react-query-key/post.key';
import { postDetailModalStatus } from '../../atom/post-detail-modal-atoms';

import Loading from 'components/common/loading';
import NotFound from 'components/not-found';
import PostDetailModal from '../../components/post-detail-modal';

const Container = styled.div`
  padding-top: 10rem;
  min-height: 100vh;
  background: black;
  overflow: hidden;
  @media (max-width: 768px) {
    padding-top: 5rem;
  }
`;

const Wrapper = styled.div`
  padding: 0;
  width: 80vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-auto-rows: 10px;
  justify-content: center;

  .card_small {
    grid-row-end: span 26;
  }
  .card_medium {
    grid-row-end: span 33;
  }
  .card_large {
    grid-row-end: span 45;
  }
`;

const Box = styled.div`
  min-height: 1000px;
`;

const Card = styled.div`
  padding: 0px;
  margin: 15px 10px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const PostsPage = () => {
  const [postId, setPostId] = useState<string>(
    localStorage.getItem('previousPageUrl') || ''
  );

  const [searchParams, setSearchParams] = useState('test'); // 임시

  const [postDetailModal, setPostDetailModal] = useRecoilState(
    postDetailModalStatus
  );

  const {
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    data,
  } = useInfiniteQuery({
    queryKey: [postsKey.posts],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.posts?.length > 0 ? lastPage.page + 1 : undefined;
    },
  });

  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = !!pageRef?.isIntersecting; // 페이지 끝에도달

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

  useEffect(() => {
    const previousPageUrl = localStorage.getItem('previousPageUrl');
    if (previousPageUrl) {
      setPostId(previousPageUrl);
      setPostDetailModal(true);
    }

    const onBeforeUnload = () => {
      localStorage.removeItem('previousPageUrl');
    };

    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      localStorage.removeItem('previousPageUrl');
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, []);

  if (!isLoading && data?.pages[0].posts.length === 0) {
    return <NotFound text={'아직 작성된 게시글이 없습니다..'} />;
  }

  return (
    <Container>
      {isLoading ? (
        <Box>
          <Loading />
        </Box>
      ) : (
        <>
          {postDetailModal && <PostDetailModal postId={postId} />}

          <Wrapper>
            {data?.pages?.map((page) =>
              page?.posts?.map((post) => (
                <Card
                  className={post.className}
                  key={post._id}
                  onClick={() => {
                    setPostDetailModal(true);
                    setPostId(post._id);
                  }}
                >
                  <Image src={post?.images[0]} />
                </Card>
              ))
            )}
          </Wrapper>
        </>
      )}

      {(isFetching || isFetchingNextPage) && <Loading loader={true} />}

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

export default PostsPage;
