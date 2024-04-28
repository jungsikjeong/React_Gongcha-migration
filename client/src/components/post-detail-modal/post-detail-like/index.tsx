import { motion } from 'framer-motion';
import { FcLike } from 'react-icons/fc';
import { SlHeart } from 'react-icons/sl';
import styled from 'styled-components';

const Container = styled(motion.div)`
  cursor: pointer;
`;

interface IPostDetailLikeProps {
  handlePostLike: () => void;
  isPostLike: boolean | undefined;
}

const PostDetailLike = ({
  handlePostLike,
  isPostLike,
}: IPostDetailLikeProps) => {
  return (
    <Container
      onClick={handlePostLike}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      {isPostLike ? (
        <FcLike style={{ fontSize: 24 }} />
      ) : (
        <SlHeart style={{ fontSize: 24 }} />
      )}
    </Container>
  );
};

export default PostDetailLike;
