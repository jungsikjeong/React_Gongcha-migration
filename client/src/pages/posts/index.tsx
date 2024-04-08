import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { postDetailModalStatus } from '../../atom/post-detail-modal-atoms';

import Loading from 'components/common/loading';
import NotFound from 'components/not-found';
import PostDetailModal from '../../components/post-detail-modal';
import UseFetchPosts from './hook/use-fetch-posts';

const Container = styled.div`
  padding-top: 10rem;
  min-height: 100vh;
  background: black;
  overflow: hidden;
  @media (max-width: 768px) {
    padding-top: 5rem;
  }
`;

const Wrapper = styled.div`
  padding: 0;
  width: 80vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-auto-rows: 10px;
  justify-content: center;

  .card_small {
    grid-row-end: span 26;
  }
  .card_medium {
    grid-row-end: span 33;
  }
  .card_large {
    grid-row-end: span 45;
  }
`;

const Card = styled(motion.div)`
  padding: 0px;
  margin: 15px 10px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const PostsPage = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [postId, setPostId] = useState<string>('');

  const [postDetailModal, setPostDetailModal] = useRecoilState(
    postDetailModalStatus
  );
  const { data: posts, isLoading } = UseFetchPosts();

  if (posts?.length === 0) {
    return <NotFound text={'아직 작성된 게시글이 없습니다..'} />;
  }
  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <AnimatePresence>
            {postDetailModal && (
              <PostDetailModal
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                postId={postId}
              />
            )}
          </AnimatePresence>

          <Wrapper>
            {posts?.map((post, index: number) => (
              <Card
                className={post.className}
                key={index}
                onClick={() => {
                  setPostDetailModal(true);
                  setSelectedId(index);
                  setPostId(post._id);
                }}
                layoutId={`item-motion-${index}`}
              >
                <Image src={post?.images[0]} />
              </Card>
            ))}
          </Wrapper>
        </>
      )}
    </Container>
  );
};

export default PostsPage;
