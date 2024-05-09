import { motion } from 'framer-motion';
import styled from 'styled-components';

import { RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import SearchBar from 'components/search';
import MobileUser from './mobile-user';

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
    bottom: 0;
    position: fixed;
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
`;

const Li = styled(motion.li)`
  width: 100px;
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

const Box = styled.div`
  position: absolute;
  top: 10px;
  left: 4rem;
`;

interface IMobileNavbar {
  handleCloseMenu: (e: React.MouseEvent) => void;
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
      <Box>
        <SearchBar />
      </Box>

      <Ul>
        <Li>
          <Link to='/' onClick={handleCloseMenu}>
            HOME
          </Link>
        </Li>

        <Li>
          <Link to='/about' onClick={handleCloseMenu}>
            ABOUT
          </Link>
        </Li>
        <Li>
          <Link to='/posts' onClick={handleCloseMenu}>
            POSTS
          </Link>
        </Li>

        <MobileUser />
      </Ul>
    </Container>
  );
};

export default MobileNavbar;
