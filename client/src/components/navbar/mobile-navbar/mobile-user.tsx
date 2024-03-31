import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { authModalState } from '../../../atom/auth-modal-atoms';

import { useUser } from 'components/auth-modal/hook/auth/use-user';
import Button from '../../common/button';
import MobileUserMenu from './mobile-user-menu';

const Container = styled.div``;

const Wrapper = styled.div``;

const LoginButton = styled(Button)`
  font-size: 17px;
  font-weight: bold;
  width: 100px;
  position: absolute;
  margin-top: 10px;
  margin-left: 5px;
  z-index: 2;

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
`;

const MobileUser = () => {
  const { user } = useUser();
  // 모달창
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <Container>
      <Wrapper>
        {user ? (
          <MobileUserMenu userInfo={user} />
        ) : (
          <LoginButton onClick={() => setAuthModalState(true)} type='button'>
            SIGN IN
          </LoginButton>
        )}
      </Wrapper>
    </Container>
  );
};

export default MobileUser;
