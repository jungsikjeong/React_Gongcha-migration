import { FcLike } from 'react-icons/fc';
import { SlHeart } from 'react-icons/sl';
import { useLocation } from 'react-router-dom';

import styled from 'styled-components';

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

const CommentList = () => {
  const location = useLocation();
  const test = false;
  return (
    <CommentsList>
      <Wrapper>
        <Image
          src='https://img.hankyung.com/photo/202306/03.33835613.1.jpg'
          alt=''
        />

        <Post $ispathname={location.pathname.includes('/commentList')}>
          <b>일이삼사오육</b> 너무 행복했고 너무 너무 좋았습니다.
          <Bottom>
            <span>좋아요 1개</span> <span>답글 달기</span>
          </Bottom>
        </Post>

        <LikeBtn>{test ? <FcLike /> : <SlHeart />}</LikeBtn>
      </Wrapper>
    </CommentsList>
  );
};

export default CommentList;
