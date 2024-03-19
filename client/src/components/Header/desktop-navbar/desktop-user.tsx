import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { authModalState } from '../../../atom/auth-modal-atoms';

import { authState } from '../../../atom/auth-atoms';
import Button from '../../common/Button';
import DesktopUserMenu from './desktop-user-menu';

const Container = styled.div``;

const Wrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 5rem;
`;

const LoginButton = styled(Button)`
  font-size: 17px;
  font-weight: bold;
  width: 100px;

  &::after {
    content: '';
    width: 0;
    height: 2px;
    background: #cf3e58;
    display: block;
    margin: auto;
    transition: 0.5s;
  }

  &:hover::after {
    width: 70px;
  }

  @media (max-width: 768px) {
    position: absolute;
    left: 0px;
    top: 15rem;
    z-index: 2;
    margin-left: 33px;
    margin-right: 50px;
    margin-top: 10px;

    ::after {
      content: '';
      width: 0;
      height: 2px;
      background: #cf3e58;
      display: block;
      margin: auto;
      transition: 0.5s;
    }

    :hover::after {
      width: 100%;
    }
  }
`;

const DesktopUser = () => {
  const userInfo = useRecoilValue(authState);
  // 모달창
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <Container>
      <Wrapper>
        {userInfo ? (
          <DesktopUserMenu userInfo={userInfo} />
        ) : (
          <LoginButton onClick={() => setAuthModalState(true)} type='button'>
            SIGN IN
          </LoginButton>
        )}
      </Wrapper>
    </Container>
  );
};

export default DesktopUser;
