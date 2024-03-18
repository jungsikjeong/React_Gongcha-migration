import { motion } from 'framer-motion';
import styled from 'styled-components';
import bgImage from '../../assets/background.jpg';
import MainFooter from '../../components/home-footer';

const Container = styled(motion.div)`
  height: 100vh;
  position: relative;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)),
    url(${bgImage});
  background-position: center;
  background-size: cover;
  overflow: hidden;
`;

const BannerTitle = styled.div`
  margin: 80px 130px;
  margin-top: 15rem;
  color: #fff;

  h1 {
    font-size: 64px;
    margin-bottom: 30px;
    letter-spacing: -5px;
    font-weight: bold;
  }

  .textColor {
    color: #cf3e58;
    opacity: 0.8;
    display: inline-block;
  }

  @media (max-width: 768px) {
    margin: 15rem 0 80px 30px;

    h1 {
      font-size: 50px;
      letter-spacing: -5px;
    }
  }

  @media (max-width: 390px) {
    h1 {
      font-size: 42px;
      letter-spacing: -5px;
    }
  }
`;

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } },
};

const Home = () => {
  return (
    <Container initial='hidden' animate='visible' exit='hidden'>
      {/* <LikeEffect /> */}
      <BannerTitle>
        <motion.h1 variants={textVariants}>
          <motion.span className='textColor' variants={textVariants}>
            Tea
          </motion.span>
          로 시작하는 <br />
          <motion.span className='textColor' variants={textVariants}>
            The
          </motion.span>
          기분 좋은 아침!
        </motion.h1>
      </BannerTitle>

      <MainFooter />
    </Container>
  );
};

export default Home;
