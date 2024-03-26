import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const ImageBox = styled.div`
  position: relative;
  width: 150px;
  aspect-ratio: auto 1/1;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
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
  return (
    <div>
      <Swiper spaceBetween={-20} slidesPerView={2}>
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
              <Image src={img} alt='' />
            </ImageBox>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImgSwiper;
