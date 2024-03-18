import { motion } from 'framer-motion';
import styled from 'styled-components';

const Text = styled(motion.div)`
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
  return (
    <Text
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
      }}
    >
      {text}
    </Text>
  );
};

export default ErrorText;
