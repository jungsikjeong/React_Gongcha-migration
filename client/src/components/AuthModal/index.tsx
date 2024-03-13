import { motion } from 'framer-motion';
import styled from 'styled-components';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IoClose } from 'react-icons/io5';

import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../atom/authModalAtoms';
import Login from './Login';
import Register from './Register';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 20;
  overflow: hidden;
`;

const Wrapper = styled(motion.div)`
  width: 500px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 0 5rem;
  margin: 0 auto;
`;

const StylesSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 15px;
  right: 50px;
  font-size: 32px;
  color: white;
  width: 25px;
  height: 25px;
  @media (max-width: 768px) {
    right: 180px;
  }
`;

const AuthModal = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <Container>
      <Wrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.24,
        }}
      >
        <CloseButton
          onClick={() => setAuthModalState(false)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <IoClose />
        </CloseButton>

        <StylesSwiper spaceBetween={50} slidesPerView={1} loop={true}>
          <SwiperSlide>
            <Login />
          </SwiperSlide>
          <SwiperSlide>
            <Register />
          </SwiperSlide>
        </StylesSwiper>
      </Wrapper>
    </Container>
  );
};

export default AuthModal;
