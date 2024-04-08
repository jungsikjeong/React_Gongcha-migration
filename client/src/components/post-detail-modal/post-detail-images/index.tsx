import styled from 'styled-components';

const Container = styled.div`
  aspect-ratio: auto 3/4;
  background-color: black;
  height: 100%;

  /* padding: 4rem;
  padding-right: 0; */
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;

  /* object-fit: cover; */
  /* max-width: 100%;
  max-height: 100%;
  width: 100%; */
`;

const PostDetailImages = ({ url }: { url: string[] }) => {
  return (
    <Container>
      <PostImage
        // src='https://image.xportsnews.com/contents/images/upload/article/2020/1111/mb_1605070416816998.jpg'
        src={url && url[0]}
        alt='postImg'
      />
    </Container>
  );
};

export default PostDetailImages;
