import ImageCropper from 'components/common/image-cropper';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { fileObjectState } from 'atom/file-object-atoms';
import { dataURItoFile } from 'components/uitls/data-url-to-file';
import useImageCompress from 'hook/use-image-compress';

import ImgSwiper from 'components/img-swiper';

const Container = styled.div``;

const Wrapper = styled.div``;

const UploadButton = styled.button`
  padding: 0.5rem;
  margin: 0.5rem 0;
  color: #afe4f8;
  border: 1px solid rgb(38, 38, 38);
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  aspect-ratio: auto 1/1;
`;

const Cover = styled.div`
  text-align: center;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 10px;
  right: 10px;
  bottom: 0;
  font-size: 20px;
  color: white;
  background-color: black;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  z-index: 10;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 0 0 5px black;
  }
`;

interface IFileFormProps {
  oldImages?: string[] | undefined;
  deleteImages?: string[] | undefined;
  setDeleteImages?: React.Dispatch<React.SetStateAction<string[]>>;
}

const FileForm = ({
  deleteImages,
  oldImages,
  setDeleteImages,
}: IFileFormProps) => {
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [uuId, setUuId] = useState<string>('');
  const [compressedImages, setCompressedImages] = useState<string[]>([]);

  const { isLoading: isCompressLoading, compressImage } = useImageCompress();

  const [fileObject, setFileObject] = useRecoilState(fileObjectState);

  const handleUploadImage = (image: string) => {
    if (fileObject.length >= 5) {
      return toast.error('이미지는 최대 다섯개까지만 올려주세요!');
    }
    setUuId(uuid());
    setUploadImage(image);
  };
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

  const handleImageDelete = (index: number) => {
    const updatedImages = [...compressedImages];
    const updatedFileObject = [...fileObject];
    // Blob 객체가 아니면 deleteImg 객체에 추가하기
    if (!((updatedImages[index] as any) instanceof Blob)) {
      if (setDeleteImages) {
        const deleteImgs = Array.isArray(deleteImages) ? [...deleteImages] : [];
        deleteImgs.push(updatedImages[index]);
        setDeleteImages(deleteImgs);
      }
    }

    updatedImages.splice(index, 1);
    updatedFileObject.splice(index, 1);

    setCompressedImages(updatedImages);
    setFileObject(updatedFileObject);
  };

  useEffect(() => {
    if (uploadImage) {
      handleCompressImage();
    }
  }, [uploadImage, uuId]);
  // 기존에 업로드된 이미지의 url 가져옴
  useEffect(() => {
    if (oldImages) {
      setCompressedImages([...oldImages]);
      setFileObject([...oldImages]);
    }
  }, [oldImages]);

  return (
    <Container>
      <Wrapper>
        {compressedImages.length === 1 && !isCompressLoading ? (
          <div style={{ position: 'relative' }}>
            <CloseButton
              onClick={() => handleImageDelete(0)}
              whileTap={{ scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <IoClose />
            </CloseButton>
            <Img src={compressedImages[0]} alt='compressed image' />
          </div>
        ) : compressedImages.length > 1 && !isCompressLoading ? (
          <ImgSwiper
            images={compressedImages}
            handleCompressImageDelete={handleImageDelete}
          />
        ) : (
          <Cover>{isCompressLoading && '이미지 압축 중..'}</Cover>
        )}

        <ImageCropper onCrop={handleUploadImage}>
          <UploadButton>📷</UploadButton>
        </ImageCropper>
      </Wrapper>
    </Container>
  );
};

export default FileForm;
