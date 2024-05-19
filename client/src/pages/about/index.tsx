import { motion } from 'framer-motion';
import styled from 'styled-components';

const AboutContainer = styled(motion.div)`
  background: #000;
`;

const Section = styled.div<{ $bgurl: string }>`
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)),
    url(${(props) => props.$bgurl});
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  overflow-x: hidden;
  height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (max-width: 768px) {
    background-attachment: scroll;
  }

  h1,
  h3 {
    font-weight: bold;
  }

  .Section-text {
    position: relative;
    width: 100%;

    h1,
    h3 {
      text-align: center;
      color: white;
    }

    .span-width {
      ::after {
        content: '';
        width: 50px;
        height: 2px;
        background: #fff;
        display: block;
        margin: auto;
        transition: 0.5s;
      }
    }
  }
`;

const AboutPage = () => {
  return (
    <AboutContainer
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Section $bgurl={'/images/about/about-img01.jpg'}>
        <div className='Section-text'>
          <h1>공차는 고민합니다.</h1>
          <br />
          <br />

          {/* 가로 줄 */}
          <span className='span-width' />
          <br />
          <br />
          <h3>
            많은 이들에게 즐겁고 쉬운 차(茶) 문화를 <br />
            이야기 할 수 있는 방법을.
          </h3>
        </div>
      </Section>

      <Section
        $bgurl={'/images/about/about-img02.jpg'}
        style={{ marginTop: '5rem' }}
      >
        <div className='Section-text'>
          <h1>공차는 고민합니다.</h1>
          <br />
          <br />

          {/* 가로 줄 */}
          <span className='span-width' />
          <br />
          <br />
          <h3>
            다양한 메뉴와 즐거운 선택을 통해
            <br />
            남녀노소 누구나 쉽게 즐기는 <br />
            차(茶) 문화를.
          </h3>
        </div>
      </Section>

      <Section
        $bgurl={'/images/about/about-img03.jpg'}
        style={{ marginTop: '5rem' }}
      >
        <div className='Section-text'>
          <h1>공차는 고민합니다.</h1>
          <br />
          <br />

          {/* 가로 줄 */}
          <span className='span-width' />
          <br />
          <br />
          <h3>
            고객들에게 만족스러운 경험을 제공하는
            <br />
            브랜드가 되기 위해.
          </h3>
        </div>
      </Section>

      <Section
        $bgurl={'/images/about/about-img04.jpg'}
        style={{ marginTop: '5rem', height: '40rem' }}
      >
        <div className='Section-text'>
          <h1>공차는 고민합니다.</h1>
          <br />
          <br />

          {/* 가로 줄 */}
          <span className='span-width' />
          <br />
          <br />
          <h3>더 쉽고, 더 즐거우며, 기억에 남는 서비스와 고객 경험을.</h3>
        </div>
      </Section>
    </AboutContainer>
  );
};

export default AboutPage;
