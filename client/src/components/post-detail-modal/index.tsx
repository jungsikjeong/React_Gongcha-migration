import { AnimatePresence, motion } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { postDetailModalStatus } from '../../atom/post-detail-modal-atoms';

import { useEffect } from 'react';
import PostDetailContents from './post-detail-contents';
import PostDetailImages from './post-detail-images';

const Container = styled(motion.div)`
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
  z-index: 20;
  overflow: hidden;
`;

const Wrapper = styled(motion.div)`
  max-width: calc(100% - 64px - 64px);
  max-height: calc(100vh - 40px);
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Close = styled.div`
  position: absolute;
  right: 30px;
  font-size: 2rem;
  cursor: pointer;
`;

const PostDetailModal = ({ selectedId }: { selectedId: number | null }) => {
  const setPostDetailModal = useSetRecoilState(postDetailModalStatus);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        setPostDetailModal(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <AnimatePresence>
      <Container layoutId={`item-motion-${selectedId}`}>
        <Wrapper>
          <Close onClick={() => setPostDetailModal(false)}>
            <IoMdClose />
          </Close>
          <PostDetailImages />
          <PostDetailContents />
        </Wrapper>
      </Container>
    </AnimatePresence>
  );
};

export default PostDetailModal;

// initial={{ opacity: 0 }}
// animate={{ opacity: 1 }}
// exit={{ opacity: 0, transition: { duration: 0.15 } }}
