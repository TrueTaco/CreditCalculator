import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
   *{
        margin: 0;
        padding: 0;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-family: "Roboto", sans-serif;
   }
   `;

export default GlobalStyle;
