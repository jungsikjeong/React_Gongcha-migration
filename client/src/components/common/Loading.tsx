import styled, { keyframes } from 'styled-components';

// 로딩 아이콘에 대한 회전 애니메이션 키프레임 정의
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div<{ $loader: string }>`
  position: ${({ $loader }) => ($loader ? 'static' : 'fixed')};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 9999;
`;

const LoaderWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  /* background-color: #f5f5dc; */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

const LoaderIcon = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white;

  &:nth-child(1) {
    top: 10px;
    background-color: tomato;
  }

  &:nth-child(2) {
    right: 10px;
    background-color: #c08457;
  }

  &:nth-child(3) {
    bottom: 10px;
    background-color: #7c3f06;
  }
  &:nth-child(4) {
    left: 10px;
    background-color: #964b00;
  }
`;

const LoaderText = styled.div`
  font-size: 18px;
  color: white;
`;

function Loading({ loader = false }) {
  return (
    <Container $loader={loader ? 'true' : ''}>
      <LoaderWrapper>
        <LoaderIcon />
        <LoaderIcon />
        <LoaderIcon />
        <LoaderIcon />
      </LoaderWrapper>

      <LoaderText>Gong cha</LoaderText>
    </Container>
  );
}

export default Loading;
