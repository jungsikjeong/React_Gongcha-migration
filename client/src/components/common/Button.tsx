import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  border: 0;
  outline: none;
  color: #fff;
  font-weight: bold;
  font-size: 17px;
  background: rgba(0, 0, 0, 0);
  font-weight: bold;
  cursor: pointer;

  ${(props: any) =>
    props.imageChange &&
    css`
      width: 100%;
      margin-top: 10px;
      padding: 3px;
      background: #00b9f6;
    `}

  ${(props: any) =>
    props.profileBtn &&
    css`
      width: 100%;
      margin-top: 10px;
      padding: 3px;
      background: #04aaff;
    `}


  ${(props: any) =>
    props.logoutBtn &&
    css`
      width: 100%;
      margin-top: 10px;
      padding: 3px;
      background: red;
    `}
`;

const Button = (props: any) => {
  return <StyledButton {...props} />;
};

export default Button;
