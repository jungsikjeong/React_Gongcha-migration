import styled from 'styled-components';

const Text = styled.div`
  padding-top: 0.5rem;
  color: #ef4b3f;
  background-color: rgba(0, 0, 0, 0.8);
  letter-spacing: -1px;
`;

interface IErrorText {
  text: string | undefined;
}

const ErrorText = ({ text }: IErrorText) => {
  return <Text>{text}</Text>;
};

export default ErrorText;
