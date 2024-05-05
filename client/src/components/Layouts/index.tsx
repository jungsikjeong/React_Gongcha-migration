import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { authModalState } from '../../atom/auth-modal-atoms';

import AuthModal from '../auth-modal';
import Navbar from '../navbar';
import Welcome from '../welcome';

const Container = styled.div``;

const Wrapper = styled.div``;

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const location = useLocation();
  const isAuthModal = useRecoilValue(authModalState);

  return (
    <Container>
      <Welcome />
      {isAuthModal && <AuthModal />}
      {!location.pathname.includes('/commentList') &&
        location.pathname !== '/write' &&
        location.pathname !== '/myPage' &&
        !location.pathname.includes('/edit') && <Navbar />}
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

export default Layout;
