import { CSSProperties, ReactNode, createElement } from 'react';
import styled from 'styled-components';

type TagVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

interface ITypographyProps {
  tag: TagVariants;
  children: ReactNode;
  style?: CSSProperties;
}

const DynamicTypography = styled(
  ({ tag, children, ...props }: ITypographyProps) =>
    createElement(tag, props, children)
)`
  color: rgb(245, 245, 245);
  :focus {
    outline: none;
  }
`;

const Typography = ({
  tag = 'p',
  children,
  ...props
}: ITypographyProps & CSSProperties) => (
  <DynamicTypography tag={tag} style={{ ...props }}>
    {children}
  </DynamicTypography>
);

export default Typography;
