import { FcLike } from 'react-icons/fc';
import { SlHeart } from 'react-icons/sl';

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

const Post = styled.div`
  width: 100%;
  max-width: 335px;
  font-size: 14px;
  line-height: 18px;
  color: rgb(245, 245, 245);
  gap: 5px;
`;

const CommentLike = styled.div`
  cursor: pointer;
  margin-top: 9px;
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
  const test = false;
  return (
    <CommentsList>
      <Wrapper>
        <Image
          src='https://img.hankyung.com/photo/202306/03.33835613.1.jpg'
          alt=''
        />

        <Post>
          <b>일이삼사오육</b> 너무 행복했고 너무 너무 좋았습니다.
          <Bottom>
            <span>좋아요 1개</span> <span>답글 달기</span>
          </Bottom>
        </Post>

        <CommentLike>{test ? <FcLike /> : <SlHeart />}</CommentLike>
      </Wrapper>
    </CommentsList>
  );
};

export default CommentList;
