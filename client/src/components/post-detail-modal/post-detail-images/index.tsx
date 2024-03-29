import styled from 'styled-components';

const PostWrapper = styled.div`
  aspect-ratio: auto 3/4;
  background-color: black;
`;

const PostImage = styled.img`
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
  /* max-width: 100%;
  max-height: 100%;
  width: 100%; */
`;

const PostDetailImages = () => {
  return (
    <PostWrapper>
      <PostImage
        src='https://image.xportsnews.com/contents/images/upload/article/2020/1111/mb_1605070416816998.jpg'
        alt='postImg'
      />
    </PostWrapper>
  );
};

export default PostDetailImages;
