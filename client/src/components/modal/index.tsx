import styled from 'styled-components';

const Container = styled.div``;

const ImageBox = styled.div`
  position: relative;
  aspect-ratio: auto 1/1;
  margin: 0 auto;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

interface IModal {
  image: string;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ image }: IModal) => {
  return (
    <Container>
      <ImageBox>
        <Image src={image} alt='img-preview' />
      </ImageBox>
    </Container>
  );
};

export default Modal;
