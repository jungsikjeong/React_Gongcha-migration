import { useCallback, useState } from 'react';
import styled from 'styled-components';

import useFetchCommentReplyList from 'hook/comments-reply/use-fetch-comment-reply-list';

import FlexBox from 'components/common/flex-box';
import CommentReplyItem from './comment-reply-item';

const Container = styled.div``;

const ReplyList = styled.ul``;

const Box = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Line = styled.div`
  border-bottom-width: 1px;
  border-bottom-color: rgb(85, 85, 85);
  border-bottom-style: solid;
  width: 22px;
  margin-right: 12px;
`;

interface ICommentReplyProps {
  parentCommentId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  commentReplyCount: number;
}

const CommentReplyList = ({
  commentReplyCount,
  parentCommentId,
  setOpen,
}: ICommentReplyProps) => {
  const {
    data: commentReplies,
    isLoading,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useFetchCommentReplyList(parentCommentId);

  const [restCount, setRestCount] = useState(commentReplyCount - 3);

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    const newRestCount = restCount - 3;
    setRestCount(newRestCount);

    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage, restCount]);
  return (
    <Container>
      <ReplyList>
        {isLoading ? (
          <FlexBox $justifyContent='center'>
            <img className='spinner' src='/spinner.svg' alt='loading' />
          </FlexBox>
        ) : (
          <>
            {hasNextPage && restCount > 0 ? (
              <Box onClick={fetchNext}>
                <Line />
                <span>답글 보기({restCount}개)</span>
              </Box>
            ) : (
              <Box onClick={() => setOpen(false)}>
                <Line />
                <span>답글 숨기기</span>
              </Box>
            )}

            {(isFetching || isFetchingNextPage) && (
              <>
                <FlexBox $justifyContent='center'>
                  <img className='spinner' src='/spinner.svg' alt='loading' />
                </FlexBox>
              </>
            )}

            {commentReplies?.pages?.map((item) =>
              item?.commentReply.map((commentReply) => (
                <CommentReplyItem
                  commentReplyItem={commentReply}
                  key={commentReply._id}
                />
              ))
            )}
          </>
        )}
      </ReplyList>
    </Container>
  );
};

export default CommentReplyList;
