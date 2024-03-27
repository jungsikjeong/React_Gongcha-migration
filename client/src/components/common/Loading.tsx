import styled from 'styled-components';

const LoadingContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const Image = styled.div`
  width: 300px;
  height: 200px;
  padding: 2rem 3rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)),
    url('./loading.gif');
  background-position: center;
  background-size: cover;
  overflow: hidden;
  box-shadow: inset 0 8px 32px 0 rgb(255, 255, 255);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <Image></Image>
    </LoadingContainer>
  );
};

export default Loading;
