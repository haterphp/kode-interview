import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {theme} from "./constants/theme";
import {BrowserRouter} from "react-router-dom";
import {RouterProvider} from "./components/router";
import {ThemeProvider} from "styled-components";
import './assets/fonts/Gilroy-Black.ttf';
import './assets/fonts/Roboto-Bold.ttf';
import './assets/fonts/Roboto-Regular.ttf';
import './index.css';


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <RouterProvider/>
        </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
