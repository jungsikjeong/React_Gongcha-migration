import { CiBookmark } from 'react-icons/ci';
import { FaShare } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa6';
import { FcLike } from 'react-icons/fc';
import { SlHeart, SlSpeech } from 'react-icons/sl';

import styled from 'styled-components';

import { useRef } from 'react';
import { Link } from 'react-router-dom';

import FlexBox from 'components/common/flex-box';
import PostHeader from 'components/common/post-header';
import PostDetailImages from 'components/post-detail-modal/post-detail-images';

const Container = styled.div`
  min-width: 335px;
  background-color: black;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
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
  background-color: black;

  @media (max-width: 768px) {
    height: 150px;
    padding-top: 0;
  }
`;

const ContentsItem = styled.li`
  display: flex;
  align-items: start;
  @media (max-width: 768px) {
    flex-direction: column;
  }
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

  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 12px;
  }
`;

const Tag = styled.span`
  color: rgb(224, 241, 255);
`;

const Section = styled.section`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 23px;
  color: rgb(245, 245, 245);
  width: 100%;
  padding: 0.2rem 0;
  .bookmark {
    margin-left: auto;
  }

  .section-icons {
    cursor: pointer;
  }
`;

const MoreBtn = styled.div`
  color: rgb(168, 168, 168);
  font-size: 12px;
  cursor: pointer;
`;

interface IPostDetailContents {
  post: any;
}

const PostDetailContentsMobile = ({ post }: IPostDetailContents) => {
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const test = false;

  const handleCommentFocus = () => {
    if (commentRef.current) {
      commentRef.current.focus();
    }
  };

  return (
    <FlexBox $direction='column'>
      <PostHeader text='게시물' />
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

        <PostDetailImages url={post?.images} />

        <ContentsWrap>
          <ContentsItem>
            <Section>
              <div className='section-icons'>
                {test ? <FcLike /> : <SlHeart />}
              </div>

              <Link to='/:id/commentList'>
                <div className='section-icons'>
                  <SlSpeech />
                </div>
              </Link>

              <div className='bookmark section-icons'>
                {test ? <FaBookmark /> : <CiBookmark />}
              </div>
            </Section>

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

          <Link to={`/${post?._id}/commentList`}>
            <MoreBtn>댓글 42개 모두 보기</MoreBtn>
          </Link>
        </ContentsWrap>
      </Container>
    </FlexBox>
  );
};

export default PostDetailContentsMobile;
