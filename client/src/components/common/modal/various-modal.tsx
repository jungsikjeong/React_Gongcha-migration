import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { PostsDataType } from 'interface/posts';

import { useUser } from 'hook/auth/use-user';

import useDeletePost from 'pages/post-detail/hook/use-delete-post';
import PostShare from 'pages/post-detail/post-detail-contents/post-share';
import Button from '../button';
import ConfirmModal from './confirm-modal';

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
    scale: 0;
  }
  50% {
    opacity: 1;
    scale: 1.1;
  }
  100%{
    scale: 1;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-height: 100vh;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 30;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${fadeInAnimation} 0.3s ease-in-out;
`;

const StyledButton = styled(Button)<{ $danger?: string; $last?: string }>`
  font-weight: 700;
  background-color: rgb(38, 38, 38);
  width: 250px;
  min-height: 48px;
  padding: 4px 8px;
  border-bottom: 1px solid rgb(54, 54, 54);
  transition: all 0.3s ease;
  border-bottom-left-radius: ${({ $last }) => ($last ? '12px' : '0px')};
  border-bottom-right-radius: ${({ $last }) => ($last ? '12px' : '0px')};
  color: ${({ $danger }) => ($danger ? 'rgb(237, 73, 86)' : '#fff')};

  &:first-child {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  &:hover {
    background-color: rgb(29, 29, 29);
  }
`;

const SLink = styled(Link)`
  background-color: rgb(38, 38, 38);
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
`;

interface IVariousModalProps {
  text: string;
  text2: string;
  post: PostsDataType | undefined;
  handleConfirm?: () => void;
  handleCancel: () => void;
}

const VariousModal = ({
  text,
  text2,
  post,
  handleConfirm,
  handleCancel,
}: IVariousModalProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { user } = useUser();
  const { mutate: deletePost } = useDeletePost();

  // 게시글 삭제
  const handlePostDelete = useCallback(() => {
    if (post) {
      deletePost({ postId: post._id });
      setIsConfirmModalOpen(false);
      handleCancel();
    }
  }, [post]);

  return (
    <>
      {isConfirmModalOpen && (
        <ConfirmModal
          text='정말 삭제하시겠습니까? (예)'
          handleConfirm={() => {
            handlePostDelete();
          }}
          handleCancel={() => setIsConfirmModalOpen(false)}
        />
      )}

      <Container>
        <Wrapper>
          {user?._id === post?.author?._id && user && (
            <>
              <StyledButton
                type='button'
                onClick={() => setIsConfirmModalOpen(true)}
                $danger='true'
              >
                {text}
              </StyledButton>

              <SLink to={`/post/edit/${post?._id}`}>
                <StyledButton type='button'>{text2}</StyledButton>
              </SLink>
            </>
          )}

          {/* 공유하기 버튼 */}
          <PostShare post={post} />

          <StyledButton type='button' onClick={handleCancel} $last={'true'}>
            취소
          </StyledButton>
        </Wrapper>
      </Container>
    </>
  );
};

export default VariousModal;
