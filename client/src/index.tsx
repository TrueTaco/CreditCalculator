import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GlobalStyle from "./GlobalStyle";

const theme = createTheme({
    palette: {
        primary: {
            main: "#B7A7AE",
        },
        secondary: {
            main: "#E38664",
        },
        background: {
            default: "#E1D5D9",
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
