import styled from 'styled-components';

import bgImage from '../../assets/background.jpg';
import Header from '../../components/Header';
import MainFooter from '../../components/HomeFooter';

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)),
    url(${bgImage});
  background-position: center;
  background-size: cover;
  overflow-x: hidden;
  position: relative;
`;

const BannerTitle = styled.div`
  margin: 80px 130px;
  color: #fff;

  h1 {
    font-size: 64px;
    margin-bottom: 30px;
    letter-spacing: -5px;
    font-weight: bold;

    .textColor {
      color: #cf3e58;
      opacity: 0.8;
    }
  }

  @media (max-width: 768px) {
    margin: 80px 0 80px 0;

    h1 {
      font-size: 50px;
      letter-spacing: -5px;
    }
  }
`;

const Home = () => {
  return (
    <Container>
      <Header />
      <BannerTitle>
        <h1>
          <span className='textColor'>Tea</span> 로 시작하는 <br />
          <span className='textColor'>The</span>
          기분 좋은 아침!
        </h1>

        <MainFooter />
      </BannerTitle>
    </Container>
  );
};

export default Home;
