import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { FaBars } from 'react-icons/fa';
import { RiCloseLine } from 'react-icons/ri';

import Button from '../Common/Button';

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

  .login-btn {
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
      width: 100%;
    }
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

const MobileNavbar = styled.div`
  display: flex;
  flex: 1;
  align-items: center;

  .icon-bars {
    display: none;
  }

  @media (max-width: 1024px) {
    display: block;
    height: 100vh;
    width: 200px;
    background: rgba(0, 0, 0, 0.8);
    top: 0;
    right: 0;
    position: absolute;
    text-align: left;
    z-index: 2;

    .icon-bars {
      display: block;
      position: absolute;
      top: 0px;
      display: block;
      color: #fff;
      margin: 10px 25px;
      font-size: 22px;
      cursor: pointer;
    }
  }
`;

const MobileMenuOpen = styled.div`
  display: none;

  @media (max-width: 1024px) {
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

const DesktopNavbar = styled.div`
  display: flex;
  flex: 1;
  align-items: center;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Ul = styled(motion.ul)`
  margin-left: 50px;
  font-weight: bold;

  @media (max-width: 1024px) {
    margin-left: 9px;
    margin-top: 45px;
    display: flex;
    flex-direction: column;
  }

  li {
    &::before {
      content: '';
      position: absolute;
      top: -65px;
      left: 0;
      right: 0;
      margin: auto;
      width: 1px;
      height: 70px;
      background-color: #bbb;
    }

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
      width: 100%;
    }
  }
`;

const Li = styled(motion.li)`
  position: relative;
  display: inline-block;
  padding: 8px 25px;
  color: #fff;
`;

const SLink = styled(Link)`
  font-size: 13px;
  font-weight: 900;

  @media (max-width: 1024px) {
    display: block;
  }
`;

const LoginButton = styled(Button)`
  position: absolute;
  right: 3rem;
  top: 5rem;

  img {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-text {
    display: block;
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

const containerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ulVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const liVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Header = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [menuActive, setMenuActive] = useState<boolean>(true);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  const onShowMenu = () => {
    setMenuOpen(true);
    setMenuActive(false);
  };

  const onCloseMenu = () => {
    setMenuOpen(false);
    setMenuActive(true);
  };

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
        {/* 모바일 사이즈에서 메뉴 아이콘 활성화*/}
        {menuActive && (
          <MobileMenuOpen>
            <FaBars className='open-icon' onClick={onShowMenu} />
          </MobileMenuOpen>
        )}

        {/*데스크탑 사이즈에서 메뉴 활성화 */}
        <DesktopNavbar>
          <Ul variants={ulVariants} initial='hidden' animate='visible'>
            <Link to='/'>
              <Li variants={liVariants}>HOME</Li>
            </Link>
            <Link to='/about'>
              <Li variants={liVariants}>ABOUT</Li>
            </Link>
            <Link to='/postList'>
              <Li variants={liVariants}>POSTS</Li>
            </Link>
          </Ul>

          <LoginButton className='login-btn'>SIGN IN</LoginButton>
        </DesktopNavbar>

        {/* 모바일 사이즈에서 메뉴 활성화 */}
        {menuOpen && (
          <MobileNavbar>
            <RiCloseLine
              className='icon-bars'
              style={{ fontWeight: 'bold', fontSize: '2rem' }}
              onClick={onCloseMenu}
            />
            <Ul>
              <Link to='/'>
                <Li>HOME</Li>
              </Link>
              <Link to='/about'>
                <Li>ABOUT</Li>
              </Link>
              <Link to='/postList'>
                <Li>POSTS</Li>
              </Link>

              <Li>SIGN IN</Li>
            </Ul>
          </MobileNavbar>
        )}
      </Wrapper>
    </Container>
  );
};

export default Header;
