import {FC} from "react";
import styled, {
    ThemeFontVariants,
    ThemeFont, AnyStyledComponent, CommonThemeFontSettings,
} from "styled-components";
import * as _ from 'lodash';

type TypographyProps = {
    variant: ThemeFontVariants;
    className?: string;
    color?: string;
}

const Creator = (props: CommonThemeFontSettings) => `
    font-family: ${props.family.join(', ')};
    font-size: ${props.size}px;
    font-weight: ${props.weight};
`
const TypographyStyleCreator = ({ adaptive, ...props }: ThemeFont, color: string) => `
    ${Creator(props)}
    color: ${color};
`


type ComponentProps = Omit<TypographyProps, 'variant'>;
const components: {[T in ThemeFontVariants]: AnyStyledComponent} = {
    h1: styled.h1<ComponentProps>`${({ theme, color }) => TypographyStyleCreator(_.get(theme, 'fonts.h1'), _.get(theme, color || "colors.base0"))}`,
    h2: styled.h2<ComponentProps>`${({ theme, color }) => TypographyStyleCreator(_.get(theme, 'fonts.h2'), _.get(theme, color || "colors.base0"))}`,
    h3: styled.h3<ComponentProps>`${({ theme, color }) => TypographyStyleCreator(_.get(theme, 'fonts.h3'), _.get(theme, color || "colors.base0"))}`,
    body: styled.p<ComponentProps>`${({ theme, color }) => TypographyStyleCreator(_.get(theme, 'fonts.body'), _.get(theme, color || "colors.base0"))}`,
    footnote: styled.span<ComponentProps>`${({ theme, color }) => TypographyStyleCreator(_.get(theme, 'fonts.span'), _.get(theme, color || "colors.base0"))}`,
    step: styled.small<ComponentProps>`${({ theme, color }) => TypographyStyleCreator(_.get(theme, 'fonts.small'), _.get(theme, color || "colors.base0"))}`,
}


const Typography: FC<TypographyProps> = ({ variant = 'body', children, ...rest }) => {
    const Component = components[variant];
    return <Component {...rest}>{children}</Component>;
}

export default Typography;
