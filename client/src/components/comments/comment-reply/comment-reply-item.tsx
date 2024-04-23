import { replyCommentStatus, replyCommentUserStatus } from 'atom/comment-atoms';
import { useUser } from 'hook/auth/use-user';
import { CommentReplyTypes } from 'interface/comment';
import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import styled from 'styled-components';

import ConfirmModal from 'components/common/confirm-modal';
import FlexBox from 'components/common/flex-box';
import useDeleteCommentReply from 'hook/comments-reply/use-delete-comment-reply';
import usePostLikeCommentReply from 'hook/comments-reply/use-post-like-comment-reply';
import { FcLike } from 'react-icons/fc';
import { SlHeart } from 'react-icons/sl';

const CommentsItem = styled.li<{ $ispathname: boolean }>`
  margin-top: 1rem;
  margin-right: -2px;
  width: 100%;
  height: 100%;
  max-width: ${({ $ispathname }) => ($ispathname ? '500px' : '335px')};
  font-size: 14px;
  line-height: 18px;
  color: rgb(245, 245, 245);
`;

const Box = styled.div``;

const UserImage = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 10px;
`;

const Nickname = styled.span`
  font-weight: bold;
  margin-right: 4px;
  flex-shrink: 0;
`;

const TaggedUser = styled.span`
  margin-right: 4px;
  flex-shrink: 0;
`;

const Contents = styled.span``;

const Actions = styled.div`
  padding-top: 8px;
  font-size: 12px;
  color: rgb(168, 168, 168);

  span {
    cursor: pointer;
  }
`;

const LikeBtn = styled.div`
  cursor: pointer;
  margin-top: 5px;
  margin-left: auto;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

interface ICommentReplyItemProps {
  commentReplyItem: CommentReplyTypes;
}
const CommentReplyItem = ({ commentReplyItem }: ICommentReplyItemProps) => {
  const { user } = useUser();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const setReplyCommentStatus = useSetRecoilState(replyCommentStatus);
  const setReplyCommentUserStatus = useSetRecoilState(replyCommentUserStatus);

  const { mutate: replyDeleteMutate } = useDeleteCommentReply(
    commentReplyItem?.parentComment
  );
  const { mutate: replyLikeMutate } = usePostLikeCommentReply(
    commentReplyItem?.parentComment
  );

  const location = useLocation();

  // 댓글 삭제
  const handleCommentDelete = useCallback(() => {
    if (commentReplyItem) {
      const commentReplyId = commentReplyItem._id;
      const parentCommentId = commentReplyItem.parentComment;

      replyDeleteMutate({ commentReplyId, parentCommentId });
    }
  }, [commentReplyItem, replyDeleteMutate]);

  // 댓글 좋아요
  const handleCommentLike = useCallback(() => {
    if (commentReplyItem) {
      const parentCommentId = commentReplyItem.parentComment;
      const commentReplyId = commentReplyItem._id;

      replyLikeMutate({ commentReplyId, parentCommentId });
    }
  }, [commentReplyItem, replyLikeMutate]);

  // 답글 달기
  const handleReplyComment = useCallback((e: any) => {
    setReplyCommentStatus(true);
    setReplyCommentUserStatus({
      userId: commentReplyItem?.user._id,
      commentId: commentReplyItem?.parentComment,
      nickName: commentReplyItem?.user?.nickname,
    });
  }, []);

  return (
    <>
      {isConfirmModalOpen && (
        <ConfirmModal
          text='삭제'
          handleConfirm={() => {
            handleCommentDelete();
            setIsConfirmModalOpen(false);
          }}
          handleCancel={() => setIsConfirmModalOpen(false)}
        />
      )}

      <CommentsItem $ispathname={location.pathname.includes('/commentList')}>
        <FlexBox>
          <UserImage src={commentReplyItem?.user?.avatar} alt='' />
          <Box>
            <FlexBox>
              <Contents>
                <Nickname>{commentReplyItem?.user?.nickname}</Nickname>

                <TaggedUser className='user-reply-comment'>
                  @{commentReplyItem?.parentCommentUser?.nickname}
                </TaggedUser>
                {commentReplyItem?.contents}
              </Contents>
            </FlexBox>
            <Actions>
              {commentReplyItem?.likes?.length !== 0 && (
                <span>좋아요 {commentReplyItem?.likes?.length}개</span>
              )}{' '}
              <span onClick={handleReplyComment}>답글 달기</span>{' '}
              {user?._id === commentReplyItem?.user._id && (
                <span onClick={() => setIsConfirmModalOpen(true)}>
                  댓글 삭제
                </span>
              )}
            </Actions>
          </Box>
          <LikeBtn onClick={handleCommentLike}>
            {commentReplyItem?.likes?.length !== 0 ? (
              <>
                {commentReplyItem?.likes?.map((like) =>
                  like?.user === user?._id ? (
                    <div key={like._id}>
                      <FcLike />
                    </div>
                  ) : (
                    <div key={like._id}>
                      <SlHeart />
                    </div>
                  )
                )}
              </>
            ) : (
              <SlHeart />
            )}
          </LikeBtn>
        </FlexBox>
      </CommentsItem>
    </>
  );
};

export default CommentReplyItem;
