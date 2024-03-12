import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';

const Container = styled(motion.div)`
  display: flex;
  align-items: center;
  width: 400px;
  position: absolute;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  position: relative;
  flex-basis: 50%;
  padding: 10px;
  color: #fff;
  font-size: 1rem;
`;

const ButtonWrap = styled.div`
  text-align: right;
  margin-top: 10px;
  position: absolute;
  right: 0;
`;

const Button = styled(motion.button)`
  font-size: 20px;
  margin: 0 10px;
  color: #fff;
`;

const ImgWrapper = styled.div`
  flex-basis: 50%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
  }
`;

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } },
};

const MainFooter = () => {
  const [number, setNumber] = useState(0);
  const [images, setImages] = useState([
    {
      src: './images/inside-image01.jpg',
    },
    {
      src: './images/inside-image02.jpg',
    },
    {
      src: './images/inside-image03.jpg',
    },
    {
      src: './images/inside-image04.jpg',
    },
  ]);

  const handleClickPrev = (e: any) => {
    if (number === 0) {
      return setNumber(3);
    }
    setNumber(number - 1);
  };

  const handleClickNext = (e: any) => {
    if (number === 3) {
      return setNumber(0);
    }
    setNumber(number + 1);
  };

  return (
    <Container variants={containerVariants} initial='hidden' animate='visible'>
      <Wrapper>
        <small>공차는 세련되고 전문적인 모습으로 새로워지고 있습니다.</small>
        <ButtonWrap>
          <Button
            type='button'
            onClick={handleClickPrev}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            <FaChevronLeft />
          </Button>
          <Button
            type='button'
            onClick={handleClickNext}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            <FaChevronRight />
          </Button>
        </ButtonWrap>
      </Wrapper>

      <ImgWrapper>
        <img src={images[number].src} alt='img-view' />
      </ImgWrapper>
    </Container>
  );
};

export default MainFooter;
