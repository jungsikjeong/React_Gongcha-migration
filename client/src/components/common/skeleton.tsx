import styled, { keyframes } from 'styled-components';

// 스켈레톤 애니메이션
const skeletonAnimation = keyframes`
  0% {
    background-position:100% 0%;
  }
  100% {
    background-position:0% 0%;
  }
  `;

interface ISkeletonProps {
  width: string;
  height: string;
  $borderradius?: string;
}

const SkeletonElement = styled.div<ISkeletonProps>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  border-radius: ${({ $borderradius }) => $borderradius};
  background: linear-gradient(90deg, #1e1e1e 35%, #0a0a0a 50%, #151515 65%);
  /* background-size: 200px 100%; */
  background-size: 300% auto;
  animation: ${skeletonAnimation} 2s infinite linear;
`;

const Skeleton = ({ width, height, $borderradius }: ISkeletonProps) => {
  return (
    <div>
      <SkeletonElement
        width={width}
        height={height}
        $borderradius={$borderradius}
      />
    </div>
  );
};

export default Skeleton;
