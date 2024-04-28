import styled from 'styled-components';

const Container = styled.div`
  padding-top: 10rem;
  min-height: 100vh;
  background: black;
  overflow: hidden;
  @media (max-width: 768px) {
    padding-top: 5rem;
  }
`;

const MyPage = () => {
  return <Container>MyPage</Container>;
};

export default MyPage;
