import styled from 'styled-components';

const StyledButton = styled.button`
  border: 0;
  outline: none;
  color: #fff;
  font-weight: bold;
  font-size: 17px;
  width: 100%;
  cursor: pointer;
`;

interface IButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type: 'submit' | 'button' | 'reset';
}

const Button = ({
  children,
  onClick,
  type = 'button',
  ...props
}: IButtonProps) => {
  return (
    <StyledButton type={type ? type : 'button'} onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
