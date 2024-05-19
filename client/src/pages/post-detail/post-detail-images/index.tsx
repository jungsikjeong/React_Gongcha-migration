import styled from 'styled-components';
import Images from './images';

const ImageBox = styled.div`
  aspect-ratio: auto 3/4;
  background-color: black;
  max-height: 100%;
  margin: 0 auto;
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
      {postLoading ? (
        ''
      ) : url?.length === 1 ? (
        <Image src={url[0]} alt='post-img' />
      ) : (
        <Images images={url} />
      )}
    </ImageBox>
  );
};

export default PostDetailImages;
