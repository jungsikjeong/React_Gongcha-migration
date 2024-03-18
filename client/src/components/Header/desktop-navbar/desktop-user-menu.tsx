import { motion, stagger, useAnimate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { authState } from '../../../atom/auth-atoms';
import { IUserInfo } from '../../../interface/auth';

const Container = styled.div``;

const Image = styled.img`
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
  object-fit: cover;
`;

const UserWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 10px;
  cursor: pointer;
`;

const Menu = styled.ul`
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Item = styled.li`
  display: flex;
  text-align: center;
  font-size: 15px;
  padding: 0.5rem 1rem;
  color: #fff;
  cursor: pointer;
`;

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      'ul',
      {
        clipPath: isOpen
          ? 'inset(0% 0% 0% 0% round 10px)'
          : 'inset(10% 50% 90% 50% round 10px)',
      },
      {
        type: 'spring',
        bounce: 0,
        duration: 0.5,
      }
    );

    animate(
      'li',
      isOpen
        ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
        : { opacity: 0, scale: 0.3, filter: 'blur(20px)' },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
  }, [animate, isOpen]);

  return scope;
}

const DesktopUserMenu = ({ userInfo }: { userInfo: IUserInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const scope = useMenuAnimation(isOpen);
  const setUserInfo = useSetRecoilState(authState);

  const menuRef = useRef<HTMLDivElement>(null);

  const onLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUserInfo(null);
  };

  useEffect(() => {
    const handleOutsideClose = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClose);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClose);
    };
  }, [isOpen]);

  return (
    <Container ref={menuRef}>
      <div ref={scope}>
        <UserWrapper
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image src={userInfo.avatar} alt='avatar' />
          <p>{userInfo.nickname}</p>
        </UserWrapper>
        <Menu
          style={{
            pointerEvents: isOpen ? 'auto' : 'none',
            clipPath: 'inset(10% 50% 90% 50% round 10px)',
          }}
        >
          <Item>
            <Link to='/write' onClick={() => setIsOpen(false)}>
              🥤 공차작성하기
            </Link>
          </Item>
          <Item>
            <Link to='/mypage' onClick={() => setIsOpen(false)}>
              🔒 마이페이지
            </Link>
          </Item>
          <Item onClick={onLogout}>🖐 로그아웃</Item>
        </Menu>
      </div>
    </Container>
  );
};

export default DesktopUserMenu;
