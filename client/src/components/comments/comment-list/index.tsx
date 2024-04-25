import { replyCommentStatus, replyCommentUserStatus } from 'atom/comment-atoms';
import { useUser } from 'hook/auth/use-user';
import { IComment } from 'interface/comment';
import { useCallback, useState } from 'react';
import { FcLike } from 'react-icons/fc';
import { SlHeart } from 'react-icons/sl';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import useDeleteComment from 'hook/comments/use-delete-comment';
import usePostLikeComment from 'hook/comments/use-post-like-comment';
import styled from 'styled-components';

import ConfirmModal from 'components/common/confirm-modal';
import FlexBox from 'components/common/flex-box';
import CommentReply from '../comment-reply';

const CommentsItem = styled.li<{ $ispathname: boolean }>`
  margin-right: -2px;
  margin-top: 1rem;
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

interface ICommentListProps {
  comment: IComment;
  postId: string | undefined;
}

const CommentList = ({ comment, postId }: ICommentListProps) => {
  const { user } = useUser();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const setReplyCommentStatus = useSetRecoilState(replyCommentStatus);
  const setReplyCommentUserStatus = useSetRecoilState(replyCommentUserStatus);

  const { mutate } = useDeleteComment(postId as string);
  const { mutate: commentMutate } = usePostLikeComment(postId as string);

  const location = useLocation();

  // 댓글 삭제
  const handleCommentDelete = useCallback(() => {
    if (comment._id && postId) {
      const commentId = comment._id;

      mutate({ commentId, postId });
    }
  }, [comment._id, mutate, postId]);

  // 댓글 좋아요
  const handleCommentLike = useCallback(() => {
    if (comment._id && postId) {
      const commentId = comment._id;

      commentMutate({ commentId, postId });
    }
  }, [comment._id, commentMutate, postId]);

  // 답글 달기
  const handleReplyComment = useCallback(() => {
    setReplyCommentStatus(true);
    setReplyCommentUserStatus({
      userId: comment?.user?._id,
      commentId: comment?._id,
      nickName: comment?.user?.nickname,
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
          <UserImage src={comment?.user?.avatar} alt='' />
          <Box>
            <FlexBox $alignItems='center'>
              <Contents>
                <Nickname>{comment?.user?.nickname}</Nickname>&nbsp;
                {comment?.contents}
              </Contents>
            </FlexBox>
            <Actions>
              {comment?.likes?.length !== 0 && (
                <span>좋아요 {comment?.likes?.length}개</span>
              )}{' '}
              <span onClick={handleReplyComment}>답글 달기</span>{' '}
              {user?._id === comment?.user._id && (
                <span onClick={() => setIsConfirmModalOpen(true)}>
                  댓글 삭제
                </span>
              )}
            </Actions>
          </Box>
          {user?._id === comment?.user._id && (
            <LikeBtn onClick={handleCommentLike}>
              {comment?.likes?.length !== 0 ? (
                <>
                  {comment?.likes?.map((like) =>
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
          )}
        </FlexBox>
        {/* 대댓글 */}
        {comment?.commentReplyCount !== 0 && (
          <CommentReply
            commentReplyCount={comment?.commentReplyCount}
            parentCommentId={comment?._id}
          />
        )}
      </CommentsItem>
    </>
  );
};

export default CommentList;
