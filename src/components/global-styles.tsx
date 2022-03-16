import {createGlobalStyle} from "styled-components";

const CssBaseline = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    overflow-x: hidden;
  }
  
  @font-face {
    font-family: "Gilroy";
    src: url("/assets/fonts/Gilroy-Black.ttf");
    font-weight: 800;
  }
  
  @font-face {
    font-family: "Roboto";
    src: url("/assets/fonts/Roboto-Bold.ttf");
    font-weight: 700;
  }
  
  @font-face {
    font-family: "Roboto";
    src: url("/assets/fonts/Roboto-Regular.ttf");
    font-weight: 400;
  }

  @keyframes ripple-effect {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(2);
      opacity: 0.375;
    }
    100% {
      transform: scale(4);
      opacity: 0;
    }
  }
`

export default CssBaseline;
