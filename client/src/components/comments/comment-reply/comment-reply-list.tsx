import styled from 'styled-components';

import useFetchCommentReplyList from 'hook/comments-reply/use-fetch-comment-reply-list';

import FlexBox from 'components/common/flex-box';
import CommentReplyItem from './comment-reply-item';

const Container = styled.div``;

const ReplyList = styled.ul``;

interface ICommentReplyProps {
  parentCommentId: string;
}

const CommentReplyList = ({ parentCommentId }: ICommentReplyProps) => {
  const { data: commentReplies, isLoading } =
    useFetchCommentReplyList(parentCommentId);
  console.log(isLoading);
  return (
    <Container>
      <ReplyList>
        {isLoading ? (
          <FlexBox $justifyContent='center'>
            <img className='spinner' src='/spinner.svg' alt='loading' />
          </FlexBox>
        ) : (
          <>
            {commentReplies?.map((item, index) => (
              <CommentReplyItem commentReplyItem={item} key={index} />
            ))}
          </>
        )}
      </ReplyList>
    </Container>
  );
};

export default CommentReplyList;
