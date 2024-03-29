import { IoChevronBackSharp } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';

import { postDetailModalStatus } from 'atom/post-detail-modal-atoms';
import { useSetRecoilState } from 'recoil';

import FlexBox from 'components/common/flex-box';
import Typography from 'components/common/typography';
import styled from 'styled-components';

const IconBox = styled.div`
  color: white;
  font-size: 1.5rem;
  z-index: 10;

  cursor: pointer;
`;

const PostDetailHeader = ({ text }: { text: string }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const setPostDetailModal = useSetRecoilState(postDetailModalStatus);

  const handleGoBack = () => {
    if (
      location.pathname.includes('/commentList') ||
      location.pathname === '/write'
    ) {
      navigate(-1);
    } else {
      setPostDetailModal(false);
    }
  };

  return (
    <FlexBox
      $alignItems='center'
      $justifyContent='space-between'
      $background='black'
      $padding='5px 16px'
      style={{ borderBottom: '1px solid rgb(38, 38, 38)' }}
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
  );
};

export default PostDetailHeader;
