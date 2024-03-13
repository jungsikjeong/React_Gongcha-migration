import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { authModalState } from '../../atom/authModalAtoms';

import Button from '../Common/Button';

const Container = styled.div`
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
      @media (max-width: 1024px) {
        display: none;
      }
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
  cursor: pointer;
`;
const LoginButton = styled(Button)`
  font-size: 17px;
  font-weight: bold;
  width: 100px;
  position: absolute;
  right: 10px;
  top: 5rem;

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

const ulVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const liVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const DesktopNavbar = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <Container>
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
        <LoginButton onClick={() => setAuthModalState(true)} type='submit'>
          SIGN IN
        </LoginButton>
      </Ul>
    </Container>
  );
};

export default DesktopNavbar;
