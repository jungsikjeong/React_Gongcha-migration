import { useUser } from 'hook/auth/use-user';
import { IComment } from 'interface/comment';
import { useCallback, useState } from 'react';
import { FcLike } from 'react-icons/fc';
import { SlHeart } from 'react-icons/sl';
import { useLocation } from 'react-router-dom';

import styled from 'styled-components';

import AlertModal from 'components/common/confirm-modal';
import useDeleteComments from 'hook/comments/use-delete-comments';
import usePostLikeComments from 'hook/comments/use-post-like-comments';

const CommentsList = styled.li`
  margin-top: 1rem;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: start;
`;

const Image = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 10px;
`;

const Post = styled.div<{ $ispathname: boolean }>`
  width: 100%;
  max-width: ${({ $ispathname }) => ($ispathname ? '500px' : '335px')};
  font-size: 14px;
  line-height: 18px;
  color: rgb(245, 245, 245);

  @media (max-width: 768px) {
    /* max-width: 100%; */
  }
`;

const LikeBtn = styled.div`
  cursor: pointer;
  margin-top: 9px;
  margin-left: 0.875rem;

  @media (max-width: 768px) {
    font-size: 12px;
    margin-left: 0.5rem;
  }
`;

const Bottom = styled.div`
  padding-top: 8px;
  font-size: 12px;
  color: rgb(168, 168, 168);

  span {
    cursor: pointer;
  }
`;

interface ICommentListProps {
  comment: IComment;
  postId: string | undefined;
}

const CommentList = ({ comment, postId }: ICommentListProps) => {
  const { user } = useUser();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { mutate } = useDeleteComments(postId as string);
  const { mutate: commentMutate } = usePostLikeComments(postId as string);

  const location = useLocation();

  // 댓글 삭제
  const handleCommentDelete = useCallback(() => {
    if (comment._id && postId) {
      const commentId = comment._id;

      mutate({ commentId, postId });
    }
  }, [comment._id, mutate, postId]);

  const handleCommentLike = useCallback(() => {
    if (comment._id && postId) {
      const commentId = comment._id;

      commentMutate({ commentId, postId });
    }
  }, [comment._id, commentMutate, postId]);
  return (
    <CommentsList>
      <Wrapper>
        {isConfirmModalOpen && (
          <AlertModal
            text='삭제'
            handleConfirm={() => {
              handleCommentDelete();
              setIsConfirmModalOpen(false);
            }}
            handleCancel={() => setIsConfirmModalOpen(false)}
          />
        )}

        <Image src={comment?.user?.avatar} alt='' />

        <Post $ispathname={location.pathname.includes('/commentList')}>
          <b>{comment?.user?.nickname}</b>&nbsp;
          <span dangerouslySetInnerHTML={{ __html: comment?.contents || '' }} />
          <Bottom>
            {comment?.likes?.length !== 0 && (
              <span>좋아요 {comment?.likes?.length}개</span>
            )}{' '}
            <span>답글 달기</span>{' '}
            {user?._id === comment?.user._id && (
              <span onClick={() => setIsConfirmModalOpen(true)}>댓글 삭제</span>
            )}
          </Bottom>
        </Post>

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
      </Wrapper>
    </CommentsList>
  );
};

export default CommentList;
