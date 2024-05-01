import { useUser } from 'hook/auth/use-user';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CiBookmark, CiViewList } from 'react-icons/ci';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useSearchParams } from 'react-router-dom';
import uuid from 'react-uuid';
import styled from 'styled-components';

import { dataURItoFile } from 'components/uitls/data-url-to-file';
import useImageCompress from 'hook/use-image-compress';

import Button from 'components/common/button';
import ImageCropper from 'components/common/image-cropper';
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
  transition: all 0.3s ease-in-out;
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

const Tab = styled.li<{ clicked: string }>`
  gap: 5px;
  font-size: 14px;
  /* border-top: ${({ clicked }) =>
    clicked ? ' 1px solid rgb(245, 245, 245)' : ''}; */
  color: ${({ clicked }) =>
    clicked ? 'rgb(245, 245, 245)' : 'rgb(168, 168, 168)'};
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

const TabIndicator = styled.div<{ activeTab: number | undefined }>`
  position: absolute;
  top: 0;
  left: ${({ activeTab }) => `${activeTab}px`};
  background-color: rgb(245, 245, 245);
  transition: left 400ms ease;
  width: 65px;
  height: 1px;
`;

const ImgWrapper = styled.div``;

const Img = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  cursor: pointer;
`;

const MAX_CHARS = 100;

const MyPage = () => {
  const tab1Ref = useRef<HTMLLIElement>(null);
  const tab2Ref = useRef<HTMLLIElement>(null);

  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [uuId, setUuId] = useState<string>('');
  const [compressedImages, setCompressedImages] = useState<string>();
  const [showFullText, setShowFullText] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading: isCompressLoading, compressImage } = useImageCompress();

  const navigate = useNavigate();

  const query = searchParams.get('currentTab') || '게시물';

  const { user } = useUser();

  const text = `안녕하세요!!`;

  const handleCompressImage = async () => {
    if (!uploadImage) return;

    const imageFile = dataURItoFile(uploadImage);
    // Blob객체를 리턴함
    const compressedImage = await compressImage(imageFile);

    // 이미지 서버 저장 로직
    if (!compressedImage) return;
    // setFileObject((prev) => [...prev, compressedImage]);

    // Blob객체를 URL로만듦
    const imageUrl = URL.createObjectURL(compressedImage);
    setCompressedImages(imageUrl);
  };

  const handleUploadImage = (image: string) => {
    setUuId(uuid());
    setUploadImage(image);
  };

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

  useEffect(() => {
    if (uploadImage) {
      handleCompressImage();
    }
  }, [uploadImage, uuid]);

  return (
    <Container>
      <Wrapper>
        <BackButton onClick={() => navigate('/')}>
          <IoIosArrowBack />
        </BackButton>
        <User>
          <ImageCropper
            profileImg={true}
            onCrop={handleUploadImage}
            aspectRatio={1 / 1}
          >
            <UserImage
              src={compressedImages ? compressedImages : user?.avatar}
              alt=''
            />
          </ImageCropper>

          <Nickname>{user?.nickname}</Nickname>

          <Introduction>
            {showFullText || text.length <= MAX_CHARS
              ? text
              : text.slice(0, MAX_CHARS) + '...'}
            {!showFullText && text.length > MAX_CHARS && (
              <button onClick={() => setShowFullText(true)}>더보기</button>
            )}
          </Introduction>

          <ProfileEdit type='button'>프로필 수정</ProfileEdit>
        </User>

        <Tabs>
          <Tab
            ref={tab1Ref}
            onClick={(e) => onChangeCurrentTap(e, '게시물')}
            clicked={query && query === '게시물' ? 'true' : ''}
          >
            <CiViewList />
            게시물
          </Tab>
          <Tab
            ref={tab2Ref}
            onClick={(e) => onChangeCurrentTap(e, '북마크')}
            clicked={query && query === '북마크' ? 'true' : ''}
          >
            <CiBookmark /> 북마크
          </Tab>

          <TabIndicator activeTab={activeTab} />
        </Tabs>

        <ImgWrapper>
          {query === '게시물' && <MyPagePosts />}

          {query === '북마크' && (
            <>
              <Img
                src='https://i.pinimg.com/236x/40/74/62/4074624713d1962ee9ad10bcab4ae1d2.jpg'
                alt=''
              />
            </>
          )}
        </ImgWrapper>
      </Wrapper>
    </Container>
  );
};

export default MyPage;
