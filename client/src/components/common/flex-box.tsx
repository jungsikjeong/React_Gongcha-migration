import styled from 'styled-components';

interface IFlexBox {
  children: React.ReactNode;
  style?: React.CSSProperties;
  $direction?: string;
  $justifyContent?: string;
  $alignItems?: string;
  $wrap?: string;
  $gap?: string;
  $padding?: string;
  $background?: string;
}

const Container = styled.div<IFlexBox>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction || 'row'};
  justify-content: ${({ $justifyContent }) => $justifyContent || 'flex-start'};
  align-items: ${({ $alignItems }) => $alignItems || 'stretch'};
  flex-wrap: ${({ $wrap }) => $wrap || 'nowrap'};
  gap: ${({ $gap }) => $gap || '0'};
  padding: ${({ $padding }) => $padding};
  background: ${({ $background }) => $background || 'transparent'};
`;

const FlexBox = ({
  children,
  $direction,
  $justifyContent,
  $alignItems,
  $wrap,
  $gap,
  $padding,
  $background,
  style,
}: IFlexBox) => {
  return (
    <Container
      $direction={$direction}
      $justifyContent={$justifyContent}
      $alignItems={$alignItems}
      $wrap={$wrap}
      $gap={$gap}
      $padding={$padding}
      $background={$background}
      style={style}
    >
      {children}
    </Container>
  );
};

export default FlexBox;
