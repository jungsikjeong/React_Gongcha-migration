import { IoChevronBackSharp } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';

import FlexBox from 'components/common/flex-box';
import Typography from 'components/common/typography';
import styled from 'styled-components';

const Box = styled.div<{ $pathname: string }>`
  max-width: ${({ $pathname }) => ($pathname ? '100%' : '500px')};
  max-width: 100%;
  margin: 0 auto;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;

  &::before {
    background-color: rgb(54, 54, 54);
    bottom: -1px;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
  }

  @media (min-width: 768px) {
    max-width: 500px;
  }
`;

const IconBox = styled.div`
  color: white;
  font-size: 1.5rem;
  z-index: 10;
  cursor: pointer;
`;

const PostHeader = ({ text }: { text: string }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    if (location.key === 'default') {
      navigate('/posts');
    } else {
      navigate(-1);
    }
  };

  return (
    <Box $pathname={location.pathname === '/posts' ? 'true' : ''}>
      <FlexBox
        $alignItems='center'
        $justifyContent='space-between'
        $background='black'
        $padding='5px 16px'
      >
        <IconBox
          onClick={() => {
            handleGoBack();
          }}
        >
          <IoChevronBackSharp />
        </IconBox>

        <Typography tag={'p'} fontWeight='bold' fontSize='16px'>
          {text}
        </Typography>

        <div></div>
      </FlexBox>
    </Box>
  );
};

export default PostHeader;
