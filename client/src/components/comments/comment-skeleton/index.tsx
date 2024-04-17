import FlexBox from 'components/common/flex-box';
import Skeleton from 'components/common/skeleton';

const CommentSkeleton = ({ count = 1 }) => {
  const skeletons = Array(count).fill(0);

  return (
    <>
      {skeletons.map((_, index) => (
        <FlexBox $padding='1rem 0 0 0' key={index}>
          <Skeleton $borderradius={'50%'} width='35px' height='35px' />
          <FlexBox
            $direction='column'
            $gap='5px'
            $justifyContent='center'
            $padding='0 0 0 10px'
          >
            <Skeleton $borderradius={'12px'} width='150px' height='10px' />
            <Skeleton $borderradius={'12px'} width='100px' height='10px' />
          </FlexBox>
        </FlexBox>
      ))}
    </>
  );
};

export default CommentSkeleton;
