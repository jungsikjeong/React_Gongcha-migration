import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { authModalState } from '../../atom/authModalAtoms';

import { FaBars } from 'react-icons/fa';

import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  padding: 40px 120px;

  @media (max-width: 1024px) {
    padding: 40px 50px;
  }

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 2rem;
`;

const Logo = styled.div`
  color: #fff;

  h1 {
    font-weight: bold;
  }
  img {
    vertical-align: middle;
    width: 30px;
  }
`;

const MobileMenuOpen = styled(motion.div)`
  display: none;
  visibility: hidden;

  @media (max-width: 1024px) {
    visibility: visible;
    display: block;
    color: #fff;
    font-size: 25px;
    z-index: 2;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const SLink = styled(Link)`
  font-size: 13px;
  font-weight: 900;

  @media (max-width: 1024px) {
    display: block;
  }
`;

const containerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const setAuthModalState = useSetRecoilState(authModalState);

  const handleShowMenu = () => {
    setMenuOpen(true);
  };

  const handleCloseMenu = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const isSignIn = target.dataset.id === 'sign In';

    setMenuOpen(false);

    if (menuOpen && isSignIn) {
      setMenuOpen(false);
      setAuthModalState(true);
    }
  };

  const handleResize = () => {
    if (window.innerWidth < 1024) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.addEventListener('resize', handleResize);
  }, []);
  return (
    <Container variants={containerVariants} initial='hidden' animate='visible'>
      <Wrapper>
        <Logo>
          <Link to='/'>
            <h1>
              공들여 <br />
              맛있는 차 <br />
              공차
              <img src='./images/logo.png' alt='logo' />
            </h1>
          </Link>
        </Logo>

        {/*데스크탑 사이즈에서 메뉴 활성화 */}
        <DesktopNavbar />

        {/* 모바일 사이즈에서 메뉴 아이콘 활성화*/}
        {!menuOpen && (
          <MobileMenuOpen
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            onClick={handleShowMenu}
          >
            <FaBars className='open-icon' />
          </MobileMenuOpen>
        )}

        {/* 모바일 사이즈에서 메뉴 활성화 */}
        {menuOpen && <MobileNavbar handleCloseMenu={handleCloseMenu} />}
      </Wrapper>
    </Container>
  );
};

export default Header;
