import {FC} from "react";
import styled, {
    ThemeFontVariants,
    ThemeFont, AnyStyledComponent, CommonThemeFontSettings,
} from "styled-components";

type TypographyProps = {
    variant: ThemeFontVariants;
    className?: string;
}

const Creator = (props: CommonThemeFontSettings) => `
    font-family: ${props.family.join(', ')};
    font-size: ${props.size}px;
    font-weight: ${props.weight};
`
const TypographyStyleCreator = ({ adaptive, ...props }: ThemeFont) => `
    ${Creator(props)}
`

const components: {[T in ThemeFontVariants]: AnyStyledComponent} = {
    h1: styled.h1`${({ theme }) => TypographyStyleCreator(theme.fonts["h1"])}`,
    h2: styled.h2`${({ theme }) => TypographyStyleCreator(theme.fonts["h2"])}`,
    h3: styled.h3`${({ theme }) => TypographyStyleCreator(theme.fonts["h3"])}`,
    body: styled.p`${({ theme }) => TypographyStyleCreator(theme.fonts["body"])}`,
    footnote: styled.span`${({ theme }) => TypographyStyleCreator(theme.fonts["footnote"])}`,
    step: styled.small`${({ theme }) => TypographyStyleCreator(theme.fonts["step"])}`,
}


const Typography: FC<TypographyProps> = ({ variant = 'body', children, ...rest }) => {
    const Component = components[variant];
    return <Component {...rest}>{children}</Component>;
}

export default Typography;
