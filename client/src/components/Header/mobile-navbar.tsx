import { motion } from 'framer-motion';
import styled from 'styled-components';

import { RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Container = styled(motion.div)`
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

interface IMobileNavbar {
  //   handleCloseMenu: () => void;
  handleCloseMenu: any;
}

const MobileNavbar = ({ handleCloseMenu }: IMobileNavbar) => {
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        className='icon-bars'
      >
        <RiCloseLine
          style={{ fontWeight: 'bold', fontSize: '2rem' }}
          onClick={handleCloseMenu}
        />
      </motion.div>
      <Ul>
        <Link to='/' onClick={handleCloseMenu}>
          <Li>HOME</Li>
        </Link>
        <Link to='/about' onClick={handleCloseMenu}>
          <Li>ABOUT</Li>
        </Link>
        <Link to='/postList' onClick={handleCloseMenu}>
          <Li>POSTS</Li>
        </Link>

        <span>
          <Li
            onClick={(e) => {
              handleCloseMenu(e);
            }}
            data-id='sign In'
          >
            SIGN IN
          </Li>
        </span>
      </Ul>
    </Container>
  );
};

export default MobileNavbar;
