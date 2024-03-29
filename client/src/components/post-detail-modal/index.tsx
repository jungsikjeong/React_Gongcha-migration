import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { postDetailModalStatus } from '../../atom/post-detail-modal-atoms';

import FlexBox from 'components/common/flex-box';
import PostDetailHeader from '../common/post-detail-header';
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

  @media (max-width: 768px) {
    align-items: start;
    overflow-y: scroll;
  }
`;

const Wrapper = styled.div<{ $boxheight: number }>`
  max-width: calc(100% - 64px - 64px);
  max-height: calc(100vh - 40px);
  width: 100%;
  height: ${({ $boxheight }) => `${$boxheight}px`};

  display: flex;
  justify-content: center;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    max-width: initial;
    max-height: initial;
  }
`;

const Close = styled.div`
  position: absolute;
  right: 30px;
  font-size: 2rem;
  cursor: pointer;
  @media (max-width: 768px) {
    display: none;
  }
`;

const PostDetailModal = ({ selectedId }: { selectedId: number | null }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [boxHeight, setBoxHeight] = useState(window.innerWidth / 1.5);
  const setPostDetailModal = useSetRecoilState(postDetailModalStatus);

  useEffect(() => {
    const handleResize = () => {
      setBoxHeight(window.innerWidth / 1.875);
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // 모달이 열릴 때 배경 스크롤 비활성화
    document.body.style.overflow = 'hidden';

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        setPostDetailModal(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      // 모달이 닫힐 때 body에 추가한 overflow: hidden 스타일 제거
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  return (
    <AnimatePresence>
      <Container layoutId={`item-motion-${selectedId}`}>
        <Wrapper $boxheight={boxHeight}>
          <Close onClick={() => setPostDetailModal(false)}>
            <IoMdClose />
          </Close>

          {isMobile ? (
            <FlexBox $direction='column'>
              <PostDetailHeader text='게시물' />
              <PostDetailContents isMobile={isMobile} />
            </FlexBox>
          ) : (
            <>
              <PostDetailImages />
              <PostDetailContents isMobile={isMobile} />
            </>
          )}
        </Wrapper>
      </Container>
    </AnimatePresence>
  );
};

export default PostDetailModal;
