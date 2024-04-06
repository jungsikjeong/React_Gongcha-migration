import styled from 'styled-components';

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

const Image = styled.div`
  width: 300px;
  height: 200px;
  padding: 2rem 3rem;
  background-image: url('./loading.gif');
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
