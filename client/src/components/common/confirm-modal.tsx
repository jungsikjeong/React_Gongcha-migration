import styled, { keyframes } from 'styled-components';

import Button from './button';

const fadeInAnimation = keyframes`
  0% {
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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 30;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${fadeInAnimation} 0.3s ease-in-out;
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

interface IConfirmModalProps {
  text: string;
  handleConfirm: () => void;
  handleCancel: (value: React.SetStateAction<boolean>) => void;
}

const ConfirmModal = ({
  text,
  handleConfirm,
  handleCancel,
}: IConfirmModalProps) => {
  const onClick = () => {
    handleConfirm();
    handleCancel(false);
  };

  return (
    <Container>
      <Wrapper>
        <StyledButton type='button' onClick={onClick}>
          {text}
        </StyledButton>
        <StyledButton type='button' onClick={() => handleCancel(false)}>
          취소
        </StyledButton>
      </Wrapper>
    </Container>
  );
};

export default ConfirmModal;
