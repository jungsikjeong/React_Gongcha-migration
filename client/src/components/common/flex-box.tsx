import styled from 'styled-components';

interface IFlexBox {
  children: React.ReactNode;
  style?: React.CSSProperties;
  direction?: string;
  justifyContent?: string;
  alignItems?: string;
  wrap?: string;
  gap?: string;
}

const Container = styled.div<IFlexBox>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-start'};
  align-items: ${({ alignItems }) => alignItems || 'stretch'};
  flex-wrap: ${({ wrap }) => wrap || 'nowrap'};
  gap: ${({ gap }) => gap || '0'};
`;

const FlexBox = ({
  children,
  direction,
  justifyContent,
  alignItems,
  wrap,
  gap,
  style,
}: IFlexBox) => {
  return (
    <Container
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      wrap={wrap}
      gap={gap}
      style={style}
    >
      {children}
    </Container>
  );
};

export default FlexBox;
