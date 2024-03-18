import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import DesktopUser from './desktop-user';

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
`;

const Li = styled(motion.li)`
  position: relative;
  display: inline-block;
  padding: 8px 25px;
  color: #fff;
  cursor: pointer;

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
  const location = useLocation();

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

        {location.pathname !== '/about' && <DesktopUser />}
      </Ul>
    </Container>
  );
};

export default DesktopNavbar;
