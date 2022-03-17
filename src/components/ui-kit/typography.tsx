import {FC} from "react";
import styled, {
    ThemeFontVariants,
    ThemeFont, AnyStyledComponent, css,
} from "styled-components";
import * as _ from 'lodash';

type TypographyProps = {
    className?: string;
    color?: string;
}

const Creator = (prop: string) => css`
  font-family: ${({ theme }) => _.get(theme, prop).family.join(', ')};
  font-size: ${({ theme }) => _.get(theme, prop).size}px;
  font-weight: ${({ theme }) => _.get(theme, prop).weight};
`

type ComponentProps = Omit<TypographyProps, 'variant'>;
const Typography: { [T in string]: AnyStyledComponent } = {
    H1: styled.h1<ComponentProps>`
      ${Creator('fonts.h1')}
      color: ${({ theme, color }) => _.get(theme, color || "colors.base0")};
    `,
    H2: styled.h2<ComponentProps>`
      ${Creator('fonts.h2')}
      color: ${({ theme, color }) => _.get(theme, color || "colors.base0")};
    `,
    H3: styled.h2<ComponentProps>`
      ${Creator('fonts.h3')}
      color: ${({ theme, color }) => _.get(theme, color || "colors.base0")};
    `,
    Body: styled.h2<ComponentProps>`
      ${Creator('fonts.body')}
      color: ${({ theme, color }) => _.get(theme, color || "colors.base0")};
    `,
    Footnote: styled.h2<ComponentProps>`
      ${Creator('fonts.footnote')}
      color: ${({ theme, color }) => _.get(theme, color || "colors.base0")};
    `,
    Step: styled.h2<ComponentProps>`
      ${Creator('fonts.step')}
      color: ${({ theme, color }) => _.get(theme, color || "colors.base0")};
    `,
}

export default Typography;
