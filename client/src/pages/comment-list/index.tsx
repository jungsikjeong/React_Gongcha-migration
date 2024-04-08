import styled from 'styled-components';

import CommentForm from 'components/comments/comment-form';
import CommentList from 'components/comments/comment-list';
import PostHeader from 'components/common/post-header';

const Container = styled.div`
  min-width: 335px;
  min-height: 100vh;
  background-color: black;
  color: #fff;
  z-index: 20;
`;

const Wrapper = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

const ContentsList = styled.ul`
  height: calc(100vh - 150px);
  margin: 0;
  overflow-y: scroll;
  padding: 16px;
  scrollbar-width: none;
  background-color: black;
`;

const ContentsItem = styled.li`
  display: flex;
  align-items: start;
  border-bottom: 1px solid rgb(85, 85, 85);
  padding-bottom: 10px;
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
  font-size: 14px;
  line-height: 18px;
  gap: 5px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Tag = styled.span`
  color: rgb(224, 241, 255);
`;

const CommentListPage = () => {
  return (
    <Container>
      <Wrapper>
        <PostHeader text='게시물' />
        <ContentsList>
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
          <CommentList />
          <CommentList />
          <CommentList />
          <CommentList />
          <CommentList />
        </ContentsList>

        <CommentForm />
      </Wrapper>
    </Container>
  );
};

export default CommentListPage;
