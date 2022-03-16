import {FC} from "react";
import styled, {
    ThemeFontVariants,
    ThemeFont, AnyStyledComponent, CommonThemeFontSettings, css,
} from "styled-components";
import * as _ from 'lodash';

type TypographyProps = {
    className?: string;
    color?: string;
}

const Creator = (props: CommonThemeFontSettings) => css`
    font-family: ${props.family.join(', ')};
    font-size: ${props.size}px;
    font-weight: ${props.weight};
`
const TypographyStyleCreator = ({ adaptive, ...props }: ThemeFont, color: string) => css`
    ${Creator(props)}
    color: ${color};
`


type ComponentProps = Omit<TypographyProps, 'variant'>;
const Typography: {[T in string]: AnyStyledComponent} = {
    H1: styled.h1<ComponentProps>`${({ theme, color }) => TypographyStyleCreator(_.get(theme, 'fonts.h1'), _.get(theme, color || "colors.base0"))}`,
    H2: styled.h2<ComponentProps>`${({ theme, color }) => TypographyStyleCreator(_.get(theme, 'fonts.h2'), _.get(theme, color || "colors.base0"))}`,
    H3: styled.h3<ComponentProps>`${({ theme, color }) => TypographyStyleCreator(_.get(theme, 'fonts.h3'), _.get(theme, color || "colors.base0"))}`,
    Body: styled.p<ComponentProps>`${({ theme, color }) => TypographyStyleCreator(_.get(theme, 'fonts.body'), _.get(theme, color || "colors.base0"))}`,
    Footnote: styled.span<ComponentProps>`${({ theme, color }) => TypographyStyleCreator(_.get(theme, 'fonts.span'), _.get(theme, color || "colors.base0"))}`,
    Step: styled.small<ComponentProps>`${({ theme, color }) => TypographyStyleCreator(_.get(theme, 'fonts.small'), _.get(theme, color || "colors.base0"))}`,
}

export default Typography;
