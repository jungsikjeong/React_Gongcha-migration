import FlexBox from 'components/common/flex-box';
import Skeleton from 'components/common/skeleton/skeleton';

const CommentSkeleton = () => {
  return (
    <FlexBox $padding='1rem 0 0 0'>
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
  );
};

export default CommentSkeleton;
