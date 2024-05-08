import { useCallback } from 'react';
import { LuPlusCircle } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import useFetchCommentList from 'hook/comments/use-fetch-comment-list';
import UseFetchPostDetail from 'pages/post-detail/hook/use-fetch-post-detail';

import CommentForm from 'components/comments/comment-form';
import CommentList from 'components/comments/comment-list';
import CommentSkeleton from 'components/comments/comment-skeleton';
import FlexBox from 'components/common/flex-box';
import PostHeader from 'components/common/post-header';

const Container = styled.div`
  min-width: 335px;
  min-height: 100vh;
  background-color: black;
  color: #fff;
  z-index: 20;
  padding-top: 3rem;
`;

const Wrapper = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

const ContentsList = styled.ul`
  height: calc(100vh - 150px);
  margin: 0;
  overflow-y: scroll;
  padding: 16px;
  scrollbar-width: none;
  background-color: black;
`;

const ContentsItem = styled.li`
  display: flex;
  align-items: start;
  padding-bottom: 10px;
`;

const Image = styled.img`
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
  font-size: 14px;
  line-height: 18px;
  gap: 5px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const skeletons = Array(12).fill(0);

const CommentListPage = () => {
  let { id } = useParams();

  const { data, isLoading: postLoading } = UseFetchPostDetail(id as string);
  const {
    data: commentListResponse,
    isLoading: commentListLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useFetchCommentList(id as string);

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();

    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);
  return (
    <Container>
      <Wrapper>
        <PostHeader text='게시물' />
        <ContentsList>
          <ContentsItem>
            {postLoading ? (
              <CommentSkeleton />
            ) : (
              <>
                <Image src={data?.author?.avatar} alt='' />
                <Post>
                  <b>{data?.author?.nickname}</b>
                  <div
                    dangerouslySetInnerHTML={{ __html: data?.contents || '' }}
                  ></div>
                </Post>
              </>
            )}
          </ContentsItem>
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
                      postId={id}
                      comment={comment}
                      key={comment._id}
                    />
                  ))
                )}

                {isFetching || isFetchingNextPage ? (
                  <img src='/spinner.svg' alt='loading' className='spinner' />
                ) : (
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
        </ContentsList>

        <CommentForm post={data} />
      </Wrapper>
    </Container>
  );
};

export default CommentListPage;
