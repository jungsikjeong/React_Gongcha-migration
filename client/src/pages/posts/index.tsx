import styled from 'styled-components';

import defaultImage from '../../assets/default3.png';

const Container = styled.div`
  min-height: 100vh;
  background: #000;
  overflow: hidden;
`;

const Columns = styled.div`
  column-width: 320px;
  column-gap: 15px;
  width: 90%;
  max-width: 1100px;
  margin: 50px auto;

  figure {
    display: inline-block;
    /* border: 1px solid rgba(0, 0, 0, 0.2); */
    border: 0.5px solid #777;
    border-radius: 10px;
    margin: 0;
    margin-bottom: 15px;
    padding: 15px;
    overflow: hidden;
    /* box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5); */
    /* box-shadow: 0px 5px 7px 1px rgba(0, 10, 20, 0.14); */

    @media (max-width: 768px) {
      overflow: hidden;
    }

    img {
      width: 100%;
      height: 100%;
      transition: transform 1s;

      :hover {
        transform: scale(1.1);
        /* transform: translateY(-6px);
      transition: all 200ms; */
      }
    }

    figcaption {
      font-size: 0.9rem;
      color: #999;
      line-height: 1.5;
      border-top: 1px solid rgba(0, 0, 0, 0.2);
      padding: 10px;
      margin-top: 12px;

      p {
        color: #fff;
        font-size: 1.1rem;
        font-weight: bold;
        margin-bottom: 10px;
      }
    }
  }

  /* @media screen and (max-width: 750px) {
    column-gap: 0px;
    width: 100%;
  } */
`;

const posts = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  title: `Post ${index + 1}`,
  text: `Content of Post ${index + 1}`,
  image: '',
}));

const PostsPage = () => {
  return (
    <Container>
      <Columns>
        {posts.map((post) => (
          <figure>
            {post.image ? (
              <img src={post.image} alt='' />
            ) : (
              <img src={defaultImage} alt='' />
            )}
            <figcaption>{post.text}</figcaption>
          </figure>
        ))}
      </Columns>
    </Container>
  );
};

export default PostsPage;
