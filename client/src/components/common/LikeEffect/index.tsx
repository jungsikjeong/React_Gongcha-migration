import styled from 'styled-components';
import './like-effect.css';

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const LikeEffect = () => {
  return (
    <Container>
      <div className='effect effect1'></div>
      <div className='effect effect2'></div>
      <div className='effect effect3'></div>
      <div className='effect effect4'></div>
      <div className='effect effect5'></div>
      <div className='effect effect6'></div>
      <div className='effect effect7'></div>
      <div className='effect effect8'></div>
      <div className='effect effect9'></div>
      <div className='effect effect10'></div>
    </Container>
  );
};

export default LikeEffect;
