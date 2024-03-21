import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { postDetailModalStatus } from '../../atom/post-detail-modal-atoms';

import defaultImage from '../../assets/default3.png';
import PostDetailModal from '../../components/post-detail-modal';

const Container = styled.div`
  padding-top: 5rem;
  min-height: 100vh;
  background: black;
  overflow: hidden;
`;

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  column-width: 350px;
  column-gap: 10px;
  margin: 50px auto;
`;

const Figure = styled(motion.figure)`
  width: 100%;
  display: inline-block;
  border: 0.5px solid #777;
  margin: 0;
  margin-bottom: 15px;
  padding: 10px;
  background-color: black;
  border-radius: 10px;
  cursor: pointer;
  /* box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); */
`;

const Image = styled.img`
  width: 100%;
`;

const Figcaption = styled.figcaption`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin-top: 11px;
  line-height: 1.5;
  color: #999;
`;

const posts = Array.from({ length: 20 }, (_, index) => ({
  _id: index + 1,
  title: `Post ${index + 1}`,
  text: `Content of Post ${index + 1}`,
  image: 'https://picsum.photos/250/250',
}));

const PostsPage = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [postDetailModal, setPostDetailModal] = useRecoilState(
    postDetailModalStatus
  );

  return (
    <Container>
      <AnimatePresence>
        {postDetailModal && <PostDetailModal selectedId={selectedId} />}
      </AnimatePresence>
      <Wrapper>
        {posts.map((post: any, index: number) => (
          <Figure
            onClick={() => {
              setPostDetailModal(true);
              setSelectedId(index);
            }}
            layoutId={`item-motion-${index}`}
          >
            {post.image ? (
              <Image src={post.image} alt='' />
            ) : (
              <Image src={defaultImage} alt='' />
            )}
            <Figcaption>{post.text}</Figcaption>
          </Figure>
        ))}
      </Wrapper>
    </Container>
  );
};

export default PostsPage;
