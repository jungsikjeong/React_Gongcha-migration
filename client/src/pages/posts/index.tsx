import { useCallback, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import useIntersectionObserver from 'hook/use-intersection-observer';

import Loading from 'components/common/loading';
import NotFound from 'components/not-found';
import useFetchPosts from './hook/use-fetch-posts';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('search') || '';

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useFetchPosts(query as string);

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

  if (!isLoading && data?.pages[0].posts.length === 0) {
    return <NotFound text={'게시글이 없습니다..'} />;
  }

  return (
    <>
      <Container>
        {isLoading ? (
          <Box>
            <Loading />
          </Box>
        ) : (
          <>
            <Wrapper>
              {data?.pages?.map((page) =>
                page?.posts?.map((post) => (
                  <Card className={post.className} key={post._id}>
                    <Link to={`/post/${post?._id}`}>
                      <Image src={post?.images[0]} />
                    </Link>
                  </Card>
                ))
              )}
            </Wrapper>
          </>
        )}

        {(isFetching || isFetchingNextPage) && <Loading loader={true} />}
      </Container>
      <div
        ref={ref}
        style={{
          height: '40px',
          width: '100%',
          marginBottom: '40px',
        }}
      />
    </>
  );
};

export default PostsPage;
