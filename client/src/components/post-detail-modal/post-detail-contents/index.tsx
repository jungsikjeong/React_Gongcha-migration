import { CiBookmark } from 'react-icons/ci';
import { FaShare } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa6';
import { FcLike } from 'react-icons/fc';
import { SlHeart, SlSpeech } from 'react-icons/sl';

import styled from 'styled-components';

import CommentList from './comment-list';

const Container = styled.div`
  max-width: 335px;
  width: 100%;
  background-color: black;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  /* border-bottom: 1px solid #1c2b33; */
  border-bottom: 1px solid rgb(38, 38, 38);

  .icon {
    margin-left: auto;
    cursor: pointer;
  }
`;

const User = styled.h2`
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
`;

const ContentsWrap = styled.ul`
  height: calc(100% - 200px);
  margin: 0;
  overflow-y: scroll;
  padding: 16px;
  scrollbar-width: none;
`;

const ContentsItem = styled.li`
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
  gap: 5px;
`;

const Tag = styled.span`
  color: rgb(224, 241, 255);
`;

const Footer = styled.div`
  width: 100%;
  height: 100%;
  border-top: 1px solid rgb(38, 38, 38);
  padding: 6px 16px 8px;

  span {
    cursor: pointer;
    padding-top: 6px;
    font-size: 14px;
    color: rgb(245, 245, 245);
    line-height: 18px;
    font-weight: 600;
  }
`;

const Section = styled.section`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 23px;
  color: rgb(245, 245, 245);

  .bookmark {
    margin-left: auto;
  }

  .section-icons {
    cursor: pointer;
  }
`;

const Form = styled.form`
  display: flex;
  height: 100%;

  border-top: 1px solid rgb(38, 38, 38);
  margin-top: 1rem;
  padding-top: 0.875rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 18px;
  max-height: 50px;
  resize: none;
  background-color: transparent;
  outline: none;
  border: none;
  color: rgb(245, 245, 245);

  &::placeholder {
    color: rgb(168, 168, 168);
    font-weight: 600;
  }
`;

const PostBtn = styled.div`
  flex-shrink: 0;
  font-size: 14px;

  color: rgb(179, 219, 255);
  opacity: 0.5;
`;

const PostDetailContents = () => {
  const test = false;

  return (
    <Container>
      <Header>
        <Image
          src='https://img.hankyung.com/photo/202306/03.33835613.1.jpg'
          alt=''
        />

        <User>일이삼사오육</User>

        <div className='icon'>
          <FaShare />
        </div>
      </Header>

      <ContentsWrap>
        <ContentsItem>
          <Image
            src='https://img.hankyung.com/photo/202306/03.33835613.1.jpg'
            alt=''
          />

          <Post>
            <b>일이삼사오육</b> 너무 행복했고 너무 너무 좋았습니다.
            여러분이있기에 제가 있었던것 같습니다! 아 너무 좋아 행복해~ 나
            날아갈것같아~~~~~~~~~~~~~~~~~~ 이야아!!!!!!!!!!!! 푸슈슈슈~~~~~
            <Tag>#MiuMiu </Tag>
            <Tag>#MiuCrew </Tag>
            <Tag>#미우미우 </Tag>
            <Tag>#광고</Tag>
          </Post>
        </ContentsItem>

        <CommentList />
        <CommentList />
        <CommentList />
        <CommentList />
        <CommentList />
        <CommentList />
        <CommentList />
        <CommentList />
        <CommentList />
        <CommentList />
        <CommentList />
      </ContentsWrap>
      <Footer>
        <Section>
          <div className='section-icons'>{test ? <FcLike /> : <SlHeart />}</div>

          <div className='section-icons'>
            <SlSpeech />
          </div>

          <div className='bookmark section-icons'>
            {test ? <FaBookmark /> : <CiBookmark />}
          </div>
        </Section>

        <span>좋아요 9.4만개</span>

        <Form>
          <Textarea placeholder='댓글 달기...' />
          <PostBtn>게시</PostBtn>
        </Form>
      </Footer>
    </Container>
  );
};

export default PostDetailContents;
