import styled, { keyframes } from 'styled-components';

const animate = keyframes`
    0%{
        transform:translate(-50%,-50%) rotate(0deg);
    }
    100%{
        transform:translate(-50%,-50%) rotate(360deg);
    }
`;

const LoadingContainer = styled.div`
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    border: 4px solid #fff;
    border-bottom: 4px solid transparent;
    border-radius: 50%;
    animation: ${animate} 1s linear infinite;
  }
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <div className='loading'></div>
    </LoadingContainer>
  );
};

export default Loading;
