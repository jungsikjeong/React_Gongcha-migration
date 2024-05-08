import { useUser } from 'hook/auth/use-user';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CiBookmark, CiViewList } from 'react-icons/ci';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import Button from 'components/common/button';
import Skeleton from 'components/common/skeleton';
import MyPageBookMark from './my-page-bookmark';
import MyPagePosts from './my-page-posts';

const Container = styled.div`
  min-height: 100vh;
  background: black;
  overflow: hidden;
  color: rgb(245, 245, 245);
  padding: 2rem 0;
  @media (max-width: 768px) {
    padding-top: 5rem;
  }
`;

const Wrapper = styled.div`
  position: relative;
  max-width: 935px;
  margin: 0 auto;
`;

const BackButton = styled.div`
  position: absolute;
  top: 2rem;
  left: 1rem;
  font-size: 30px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }

  @media (max-width: 768px) {
    top: -4rem;
  }
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  margin-right: 10px;
  cursor: pointer;
`;

const Nickname = styled.h2`
  font-weight: bold;
`;

const Introduction = styled.div`
  max-width: 500px;
  text-align: left;
  margin: 0.5rem 0rem 1rem 4px;
  font-size: 14px;
  white-space: pre;

  button {
    color: rgb(245, 245, 245);
    font-weight: bold;
  }
`;

const ProfileEdit = styled(Button)`
  width: inherit;
  padding: 12px 16px;
  background-color: rgb(54, 54, 54);
  border-radius: 12px;
  font-size: 14px;

  &:hover {
    background-color: rgb(35, 35, 35);
  }
`;

const Tabs = styled.ul`
  position: relative;
  margin-top: 2rem;
  border-top: 1px solid rgb(38, 38, 38);
  display: flex;
  justify-content: space-around;
  font-weight: 600;
`;

const Tab = styled.li<{ $clicked: string }>`
  gap: 5px;
  font-size: 14px;
  border-top: ${({ $clicked }) =>
    $clicked ? ' 1px solid rgb(245, 245, 245)' : ''};
  color: ${({ $clicked }) =>
    $clicked ? 'rgb(245, 245, 245)' : 'rgb(168, 168, 168)'};
  cursor: pointer;
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    color: rgb(245, 245, 245);
  }
`;

const MAX_CHARS = 100;

const MyPage = () => {
  const tab1Ref = useRef<HTMLLIElement>(null);
  const tab2Ref = useRef<HTMLLIElement>(null);

  const [showFullText, setShowFullText] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const query = searchParams.get('currentTab') || '게시물';

  const { user, isLoading: userLoading } = useUser();

  const onChangeCurrentTap = (e: any, tabName: string) => {
    const activeNumber = e.currentTarget.offsetLeft;
    setActiveTab(activeNumber);

    setSearchParams({
      currentTab: tabName,
    });
  };

  const handleResize = useCallback(() => {
    if (tab1Ref.current && tab2Ref.current) {
      if (query === '게시물') {
        setActiveTab(tab1Ref.current.offsetLeft);
      } else if (query === '북마크') {
        setActiveTab(tab2Ref.current.offsetLeft);
      }
    }
  }, [tab1Ref, tab2Ref, query]);

  useEffect(() => {
    if (tab1Ref.current && tab2Ref.current) {
      if (query === '게시물') {
        setActiveTab(tab1Ref.current.offsetLeft);
      } else if (query === '북마크') {
        setActiveTab(tab2Ref.current.offsetLeft);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [tab1Ref, tab2Ref, query, activeTab, handleResize]);

  return (
    <Container>
      <Wrapper>
        <BackButton onClick={() => navigate('/')}>
          <IoIosArrowBack />
        </BackButton>
        <User>
          {userLoading ? (
            <>
              <Skeleton width='120px' height='120px' $borderradius='50%' />
              <Skeleton width='80px' height='20px' $margin='10px 0 10px 0 ' />
            </>
          ) : (
            <>
              <UserImage src={user?.avatar} alt='' />

              <Nickname>{user?.nickname}</Nickname>

              <Introduction>
                {showFullText ||
                  (user?.introduction &&
                    (user.introduction.length <= MAX_CHARS ? (
                      user.introduction
                    ) : (
                      <>
                        {user.introduction.slice(0, MAX_CHARS)}...
                        <button onClick={() => setShowFullText(true)}>
                          더보기
                        </button>
                      </>
                    )))}
              </Introduction>
              <Link to={`/edit/${user?._id}`}>
                <ProfileEdit type='button'>프로필 수정</ProfileEdit>
              </Link>
            </>
          )}
        </User>

        <Tabs>
          <Tab
            ref={tab1Ref}
            onClick={(e) => onChangeCurrentTap(e, '게시물')}
            $clicked={query && query === '게시물' ? 'true' : ''}
          >
            <CiViewList />
            게시물
          </Tab>
          <Tab
            ref={tab2Ref}
            onClick={(e) => onChangeCurrentTap(e, '북마크')}
            $clicked={query && query === '북마크' ? 'true' : ''}
          >
            <CiBookmark /> 북마크
          </Tab>
        </Tabs>

        {query === '게시물' && <MyPagePosts />}

        {query === '북마크' && <MyPageBookMark />}
      </Wrapper>
    </Container>
  );
};

export default MyPage;
