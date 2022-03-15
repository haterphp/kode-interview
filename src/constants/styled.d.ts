import 'styled-components';

declare module 'styled-components' {

    type ThemeColors = "base0" | "base1" | "shade20" | "shade40" | "shade50" | "easy" | "medium" | "hard";

    type ThemeElevations = {
        easy: string;
    }

    export type ThemeFontVariants = "h1" | "h2" | "h3" | "body" | "footnote" | "step";

    export type CommonThemeFontSettings = {
        family: string[];
        size: number;
        weight: number;
    }

    export type ThemeFont = CommonThemeFontSettings & {
        adaptive?: {[T in number]?: Partial<CommonThemeFontSettings> }
    }

    type ThemeBreakpoints = {
        sm: number,
        md: number,
        lg: number,
        xl: number,
        xxl: number
    }

    export interface DefaultTheme {
        colors: {[T in ThemeColors]: string}
        elevations: ThemeElevations,
        fonts: {[T in ThemeFontVariants]: ThemeFont},
        breakpoints: ThemeBreakpoints,
        fn: {
            breakpoint: (breakpoint: keyof ThemeBreakpoints) => string,
            spacing: (n: number) => string
        }
    }
}
