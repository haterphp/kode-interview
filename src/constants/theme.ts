import {DefaultTheme} from "styled-components";

const breakpoints = {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400
};

const fonts: DefaultTheme['fonts'] = {
    h1: {
        size: 64,
        family: ['Gilroy', 'sans-serif'],
        weight: 800
    },
    h2: {
        size: 40,
        family: ['Gilroy', 'sans-serif'],
        weight: 800
    },
    h3: {
        size: 24,
        family: ['Gilroy', 'sans-serif'],
        weight: 800
    },
    body: {
        size: 16,
        family: ['Roboto', 'sans-serif'],
        weight: 400
    },
    footnote: {
        size: 12,
        family: ['Roboto', 'sans-serif'],
        weight: 400
    },
    step: {
        size: 9,
        family: ['Roboto', 'sans-serif'],
        weight: 700
    },
    chip: {
        size: 12,
        family: ['Roboto', 'sans-serif'],
        weight: 400
    },
}

export const theme: DefaultTheme = {
    colors: {
        base0: "#000000",
        base1: "#FFFFFF",
        shade20: "#DDDDDD",
        shade40: "#82786A",
        shade50: "#82786A",
        easy: "#2FB65D",
        medium: "#EB8A31",
        hard: "#EB3C31"
    },
    elevations: {
        easy: "0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)"
    },
    breakpoints,
    fonts,
    fn: {
        breakpoint: (b) => `${breakpoints[b]}px`,
        spacing: (n) => `${10 * n}px`
    }
}
