import { useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import styled from 'styled-components';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Swiper as SwiperType } from 'swiper/types';

const Container = styled.div`
  position: relative;
`;

const ImageBox = styled.div`
  aspect-ratio: auto 3/4;
  background-color: black;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const BtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 8px;
    width: 30px;
    height: 30px;
    background-color: #beb3b3;
    background-color: rgb(245, 245, 245);
    border-radius: 50%;
  }

  @media (max-width: 500px) {
    display: none;
  }
`;

interface IimagesProps {
  images: string[] | undefined;
}

const Images = ({ images }: IimagesProps) => {
  const [swiperRef, setSwiperRef] = useState<SwiperType>();

  const prevHandler = () => {
    swiperRef && swiperRef.slidePrev();
  };

  const nextHandler = () => {
    swiperRef && swiperRef.slideNext();
  };

  return (
    <Container>
      <BtnWrap>
        <button onClick={prevHandler} className='prev-btn'>
          <GrFormPrevious />
        </button>
        <button onClick={nextHandler} className='next-btn'>
          <GrFormNext />
        </button>
      </BtnWrap>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        // navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper: SwiperType) => setSwiperRef(swiper)}
      >
        {images?.map((img, index) => (
          <SwiperSlide key={index}>
            <ImageBox>
              <Image src={img} alt='img' />
            </ImageBox>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Images;
