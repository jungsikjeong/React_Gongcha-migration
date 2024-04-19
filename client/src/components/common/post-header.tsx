import { useEffect } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { postDetailModalStatus } from 'atom/post-detail-modal-atoms';
import { useSetRecoilState } from 'recoil';

import FlexBox from 'components/common/flex-box';
import Typography from 'components/common/typography';
import styled from 'styled-components';

const Box = styled.div<{ pathname: string }>`
  max-width: 500px;
  max-width: ${({ pathname }) => (pathname ? '100%' : '500px')};
  margin: 0 auto;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;

  &::before {
    background-color: rgb(54, 54, 54);
    bottom: -1px;
    content: '';
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
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
  const params = useParams();
  const setPostDetailModal = useSetRecoilState(postDetailModalStatus);

  const handleGoBack = () => {
    if (
      location.pathname === '/write' ||
      location.pathname.includes('/commentList')
    ) {
      navigate(-1);
    } else {
      setPostDetailModal(false);
    }
  };

  useEffect(() => {
    if (location.pathname.includes('/commentList') && params.id) {
      localStorage.setItem('previousPageUrl', params.id as string);
    }
  }, [location.pathname, params.id]);

  return (
    <Box pathname={location.pathname === '/posts' ? 'true' : ''}>
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
