import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { authModalState } from '../../atom/auth-modal-atoms';

import AuthModal from '../auth-modal';
import Header from '../header';
import Welcome from '../welcome';

const Container = styled.div``;

const Wrapper = styled.div``;

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const isAuthModal = useRecoilValue(authModalState);

  return (
    <Container>
      <Welcome />
      {isAuthModal && <AuthModal />}
      <Header />
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

export default Layout;
