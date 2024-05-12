import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
  background-color: black;
  color: rgb(245, 245, 245);
  white-space: pre-line;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .longshadow {
    font-size: 12rem;
    color: #131313;
    color: gray;
    text-shadow: 4px 4px 0px #131313, 8px 8px 0px #131313, 12px 12px 0px #131313;
    text-shadow: 4px 4px 0px gray, 8px 8px 0px gray, 12px 12px 0px gray;
  }

  .o {
    color: tomato;
    text-shadow: 4px 4px 0px tomato, 8px 8px 0px tomato, 12px 12px 0px tomato;
    text-shadow: 4px 4px 0px tomato, 8px 8px 0px tomato, 12px 12px 0px gray;
  }
`;

const GoBack = styled.div`
  color: rgb(224, 241, 255);
  transition: all 0.3s ease;
  margin-top: 10rem;
  cursor: pointer;
  &:hover {
    color: rgb(179, 219, 255);
  }
`;

interface INotFound {
  text?: string;
}

const NotFound = ({ text }: INotFound) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <NotFoundContainer>
      {!text ? (
        <>
          <Text>
            <span className='longshadow'>
              4<span className='o'>0</span>4
            </span>
            <span>페이지를 찾을 수 없습니다..</span>
          </Text>

          <GoBack onClick={goBack}>Go back</GoBack>
        </>
      ) : (
        <>
          <Text>{text}</Text>
        </>
      )}
    </NotFoundContainer>
  );
};

export default NotFound;
