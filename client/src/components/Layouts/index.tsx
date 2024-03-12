import styled, { css, keyframes } from 'styled-components';

import { useLocation } from 'react-router-dom';
import Header from '../Header';

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

const Container = styled.div<{ $path: string }>`
  animation: ${({ $path }) =>
    $path === '/'
      ? 'none'
      : css`
          ${ScreenFrames} 0.75s
        `};
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  return (
    <Container $path={location.pathname}>
      <Header />
      {children}
    </Container>
  );
};

export default Layout;
