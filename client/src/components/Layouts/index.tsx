import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled, { css, keyframes } from 'styled-components';

import { authModalState } from '../../atom/auth-modal-atoms';

import AuthModal from '../auth-modal';
import Header from '../header';
import Welcome from '../welcome';

// 페이지 전환효과
const ScreenFrames = keyframes`
 from{
  opacity:0.9;
  transform:translateY(-10px);
 }
 to{
  opacity:1;
  transform:translateY(0);
 }
`;

const Container = styled.div``;

const Wrapper = styled.div<{ $path: string }>`
  animation: ${({ $path }) =>
    $path === '/'
      ? 'none'
      : css`
          ${ScreenFrames} 0.75s
        `};
`;

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
      <Header />
      <Wrapper $path={location.pathname}>{children}</Wrapper>
    </Container>
  );
};

export default Layout;
