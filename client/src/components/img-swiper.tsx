import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import Modal from './modal';

// TODO : 파일 취소하면에러뜨는거 해결, 모달창 해결

const Container = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;
`;

const ImageBox = styled.div`
  position: relative;
  width: 220px;
  aspect-ratio: auto 1/1;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 190px;
  }
  @media (max-width: 375px) {
    width: 140px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: white;
  background-color: black;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  z-index: 10;
`;

interface IImgSwiperProps {
  images: string[];
  handleCompressImageDelete: (index: number) => void;
}

const ImgSwiper = ({ images, handleCompressImageDelete }: IImgSwiperProps) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [modal, setModal] = useState(false);

  const swiperRef = useRef<any>(null);

  const handleImagePreview = (src: string) => {
    if (!modal) {
      setModal(true);
      setSelectedImage(src);
    }
  };

  useEffect(() => {
    // Move swiper to the last slide when images change
    if (swiperRef?.current) {
      swiperRef.current.swiper.slideTo(images.length - 1);
    }
  }, [images]);

  return (
    <Container>
      {modal && <Modal image={selectedImage} setModal={setModal} />}
      <Swiper ref={swiperRef} spaceBetween={0} slidesPerView={2}>
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <ImageBox>
              <CloseButton
                onClick={() => handleCompressImageDelete(index)}
                whileTap={{ scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <IoClose />
              </CloseButton>
              <Image
                src={img}
                alt='img-preview'
                onClick={() => handleImagePreview(img)}
              />
            </ImageBox>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default ImgSwiper;
