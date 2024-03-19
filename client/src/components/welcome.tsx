import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import styled from 'styled-components';
import LikeEffect from './common/like-effect';

import { useRecoilState } from 'recoil';
import { welcomeState } from '../atom/welcome-atoms';

const Container = styled(motion.div)`
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
  color: #fff;
  overflow: hidden;
`;

const Wrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h1``;

const Text = styled.p``;

const Welcome = () => {
  const [visible, setVisible] = useRecoilState(welcomeState);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (visible) {
      timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [visible]);
  return (
    <AnimatePresence>
      {visible && (
        <Container
          key='welcome-container'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LikeEffect />
          <Wrapper
            key='wrapper'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: 0.7,
            }}
          >
            <Title>환영합니다!</Title>
            <Text>맛있는 공차와 함께 특별한 시간을 만들어요.</Text>
          </Wrapper>
        </Container>
      )}
    </AnimatePresence>
  );
};

export default Welcome;
