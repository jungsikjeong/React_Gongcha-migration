import ImageCropper from 'components/common/image-cropper';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { fileObjectState } from 'atom/file-object-atoms';
import { dataURItoFile } from 'components/uitls/dataURItoFile';
import useImageCompress from 'hook/useImageCompress';

import ImgSwiper from 'components/img-swiper';

const Container = styled.div`
  padding: 0 1rem;
`;

const Wrapper = styled.div``;

const UploadButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0.5rem 0;
  color: #afe4f8;
  border: 1px solid rgb(38, 38, 38);
  margin-top: 1rem;
`;

const Cover = styled.div`
  text-align: center;
  padding-top: 1rem;
`;

const FileForm = () => {
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [compressedImages, setCompressedImages] = useState<string[]>([]);
  const { isLoading: isCompressLoading, compressImage } = useImageCompress();

  const [fileObject, setFileObject] = useRecoilState(fileObjectState);

  const handleUploadImage = (image: string) => setUploadImage(image);
  const handleCompressImage = async () => {
    if (!uploadImage) return;

    const imageFile = dataURItoFile(uploadImage);

    // Blob객체를 리턴함
    const compressedImage = await compressImage(imageFile);

    // 이미지 서버 저장 로직
    if (!compressedImage) return;
    setFileObject((prev) => [...prev, compressedImage]);

    // Blob객체를 URL로만듦
    const imageUrl = URL.createObjectURL(compressedImage);
    const newImage = [...compressedImages, imageUrl];
    setCompressedImages(newImage);
  };
  const handleCompressImageDelete = (index: number) => {
    const updatedImages = [...compressedImages];
    const updatedFileObject = [...fileObject];

    updatedFileObject.splice(index, 1);
    updatedImages.splice(index, 1);

    setCompressedImages(updatedImages);
    setFileObject(updatedFileObject);
  };

  useEffect(() => {
    if (uploadImage) {
      handleCompressImage();
    }
  }, [uploadImage]);

  return (
    <Container>
      <Wrapper>
        {compressedImages.length !== 0 && !isCompressLoading ? (
          <ImgSwiper
            images={compressedImages}
            handleCompressImageDelete={handleCompressImageDelete}
          />
        ) : (
          <Cover>{isCompressLoading && '이미지 압축 중..'}</Cover>
        )}

        <ImageCropper onCrop={handleUploadImage} aspectRatio={1 / 1}>
          <UploadButton>📷 공차 첨부하기</UploadButton>
        </ImageCropper>
      </Wrapper>
    </Container>
  );
};

export default FileForm;
