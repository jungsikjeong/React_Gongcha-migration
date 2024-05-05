import 'cropperjs/dist/cropper.css';
import { useRef, useState } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import { toast } from 'react-toastify';
import styled, { css } from 'styled-components';

const Container = styled.div<{ profileimg: string }>`
  z-index: 10;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .cropper-crop-box,
  .cropper-view-box {
    ${({ profileimg }) =>
      profileimg &&
      css`
        border-radius: 50%;
      `}
  }

  .cropper-view-box {
    ${({ profileimg }) =>
      profileimg &&
      css`
        box-shadow: 0 0 0 1px #39f;
        outline: 0;
      `}
  }
`;
const BackDrop = styled.div`
  position: inherit;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
`;

const Wrapper = styled.div`
  z-index: 2;
  background: #ffffff;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .title {
    font-weight: 600;
    line-height: 26px;
    padding: 20px 16px;
    text-align: center;
    color: black;
    margin: 0;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
`;
const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px 16px;
  background: #ffffff;
  column-gap: 12px;

  button {
    width: 100px;
    height: 40px;
    border: 1px solid #c3c3c3;
    border-radius: 4px;
    background: white;
  }

  .crop {
    background: #cf3e58;
    color: white;
    border: none;
  }
`;

interface IImageCropperProps {
  onCrop: (image: string) => void;
  aspectRatio?: number;
  profileImg?: boolean;
  children: React.ReactNode;
}

const ImageCropper = ({
  children,
  aspectRatio,
  onCrop,
  profileImg = false,
}: IImageCropperProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [image, setImage] = useState<null | string>(null);

  const handleChildrenClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.target.files;

    if (!files || files.length === 0) return;
    if (!files[0].type.startsWith('image/')) {
      toast.warning('이 파일은 이미지가 아닙니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== 'undefined') {
      const dataURL = cropperRef.current.cropper.getCroppedCanvas().toDataURL();

      onCrop(dataURL);
      setImage(null);
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    (event.target as HTMLInputElement).value = '';
  };

  return (
    <>
      <input
        type='file'
        ref={inputRef}
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
        onClick={(e) => handleClick(e)}
      />
      <span onClick={handleChildrenClick}>{children}</span>
      {image && (
        <Container profileimg={profileImg === true ? 'true' : ''}>
          <BackDrop />
          <Wrapper>
            <h3 className='title'>이미지 편집하기</h3>
            <ContentWrapper>
              <Content>
                <Cropper
                  ref={cropperRef}
                  aspectRatio={aspectRatio && aspectRatio}
                  initialAspectRatio={1}
                  src={image}
                  viewMode={1}
                  width={800}
                  height={500}
                  background={false}
                  responsive
                  autoCropArea={1}
                  checkOrientation={false}
                  guides
                />
              </Content>
            </ContentWrapper>
            <Footer>
              <button onClick={() => setImage(null)}>취소</button>
              <button className='crop' onClick={getCropData}>
                적용하기
              </button>
            </Footer>
          </Wrapper>
        </Container>
      )}
    </>
  );
};

export default ImageCropper;
