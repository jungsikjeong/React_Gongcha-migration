import styled from 'styled-components';

// todo: 모바일사이즈때 이미지가 너무 큰거같음

const ImageBox = styled.div`
  aspect-ratio: auto 3/4;
  background-color: black;
  /* height: 100%; */
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

interface IPostDetailImagesProps {
  postLoading: boolean;
  url: string[] | undefined;
}

const PostDetailImages = ({ url, postLoading }: IPostDetailImagesProps) => {
  return (
    <ImageBox>
      {postLoading ? '' : <Image src={url ? url[0] : ''} alt='post-img' />}
    </ImageBox>
  );
};

export default PostDetailImages;
