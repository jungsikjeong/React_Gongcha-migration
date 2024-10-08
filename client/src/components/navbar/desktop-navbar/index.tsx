import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import SearchBar from 'components/search';
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

  &li:not(:last-of-type):hover::after {
    width: 100%;
  }

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

  &:not(.except):hover::after {
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
  write: { y: -100, transition: { duration: 0.5 } },
};

const DesktopNavbar = () => {
  const location = useLocation();
  const controls = useAnimation();

  useEffect(() => {
    if (location.pathname === '/write') {
      controls.start('write');
    } else {
      controls.start('visible');
    }
  }, [location.pathname, controls]);

  return (
    <Container>
      <Ul variants={ulVariants} initial='hidden' animate={controls}>
        <Link to='/' onClick={() => window.scrollTo(0, 0)}>
          <Li variants={liVariants}>HOME</Li>
        </Link>
        <Link to='/about' onClick={() => window.scrollTo(0, 0)}>
          <Li variants={liVariants}>ABOUT</Li>
        </Link>
        <Link to='/posts' onClick={() => window.scrollTo(0, 0)}>
          <Li variants={liVariants}>POSTS</Li>
        </Link>

        {(location.pathname === '/posts' ||
          location.pathname.includes('/post')) && (
          <Li variants={liVariants} className='except'>
            <SearchBar />
          </Li>
        )}

        {location.pathname !== '/about' && <DesktopUser />}
      </Ul>
    </Container>
  );
};

export default DesktopNavbar;
