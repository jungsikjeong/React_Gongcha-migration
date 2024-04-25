import { useState } from 'react';
import styled from 'styled-components';

import CommentReplyList from './comment-reply-list';

const Container = styled.div`
  color: rgb(168, 168, 168);
  font-size: 12px;
  margin: 16px 0 0 54px;
`;

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
  commentReplyCount: number;
}

const CommentReply = ({
  commentReplyCount,
  parentCommentId,
}: ICommentReplyProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      {!open && (
        <Box onClick={() => setOpen(!open)}>
          <Line />
          <span>답글 보기({commentReplyCount}개)</span>
        </Box>
      )}

      {open && (
        <CommentReplyList
          commentReplyCount={commentReplyCount}
          parentCommentId={parentCommentId}
          setOpen={setOpen}
        />
      )}
    </Container>
  );
};

export default CommentReply;
