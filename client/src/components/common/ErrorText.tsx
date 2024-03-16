import styled from 'styled-components';

const Text = styled.div`
  color: #ef4b3f;
  width: 100%;
  letter-spacing: -1px;
  margin-top: 1rem;
  font-size: 15px;
`;

interface IErrorText {
  text: string | undefined;
}

const ErrorText = ({ text }: IErrorText) => {
  return <Text>{text}</Text>;
};

export default ErrorText;
