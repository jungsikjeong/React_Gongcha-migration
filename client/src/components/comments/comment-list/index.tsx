import { alertModalState } from 'atom/alert-modal-atoms';
import { useUser } from 'hook/auth/use-user';
import { IComment } from 'interface/comment';
import { FcLike } from 'react-icons/fc';
import { SlHeart } from 'react-icons/sl';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import styled from 'styled-components';

import AlertModal from 'components/common/alert-modal';

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
  padding-left: 0.875rem;

  @media (max-width: 768px) {
    font-size: 12px;
    padding-left: 0.5rem;
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
}

const CommentList = ({ comment }: ICommentListProps) => {
  const { user } = useUser();

  const [alertModal, setAlertModal] = useRecoilState(alertModalState);

  const location = useLocation();
  const test = false;

  const handleCommentDelete = () => {
    setAlertModal({ ...alertModal, text: '삭제' });

    if (alertModal.confirm) {
    }
  };

  return (
    <CommentsList>
      <Wrapper>
        {alertModal.text && <AlertModal />}

        <Image src={comment?.author?.avatar} alt='' />

        <Post $ispathname={location.pathname.includes('/commentList')}>
          <b>{comment?.author?.nickname}</b>&nbsp;
          <span dangerouslySetInnerHTML={{ __html: comment?.contents || '' }} />
          <Bottom>
            <span>좋아요 1개</span> <span>답글 달기</span>{' '}
            {user?._id === comment?.author._id && (
              <span onClick={() => handleCommentDelete()}>댓글 삭제</span>
            )}
          </Bottom>
        </Post>

        <LikeBtn>{test ? <FcLike /> : <SlHeart />}</LikeBtn>
      </Wrapper>
    </CommentsList>
  );
};

export default CommentList;
