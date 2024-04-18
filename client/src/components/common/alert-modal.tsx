import { alertModalState } from 'atom/alert-modal-atoms';
import { useRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';

import Button from './button';

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
    opacity: 0;
     scale: 0;
  }
  50% {
    opacity: 1;
    scale: 1.1;
  }
  100%{
    scale: 1;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  min-height: 100vh;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.05);
  z-index: 30;
  overflow: hidden;
  animation: ${fadeInAnimation} 0.3s ease-in-out;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  font-weight: 700;
  background-color: rgb(38, 38, 38);
  width: 250px;
  min-height: 48px;
  padding: 4px 8px;
  &:first-child {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom: 1px solid rgb(54, 54, 54);
    color: rgb(237, 73, 86);
  }
  &:last-child {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;

const AlertModal = () => {
  const [alertModal, setAlertModal] = useRecoilState(alertModalState);

  return (
    <Container>
      <Wrapper>
        <StyledButton
          type='button'
          onClick={() => setAlertModal({ text: '', confirm: true })}
        >
          {alertModal.text}
        </StyledButton>
        <StyledButton
          type='button'
          onClick={() => setAlertModal({ confirm: false, text: '' })}
        >
          취소
        </StyledButton>
      </Wrapper>
    </Container>
  );
};

export default AlertModal;
