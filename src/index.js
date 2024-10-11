import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

//mui
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1536,
      xl: 1536,
    },
  },
  palette: {
    mode: "light", //dark
    // primary: {
    //   main: "#228B22",
    // },
    // secondary: {
    //   main: "#f50057",
    // },
  },
  typography: {
    fontFamily: "Public Sans, sans-serif",
    subtitle1: {
      fontSize: "12px",
    },
    subtitle2: {
      fontSize: "12px",
    },
    body1: {
      fontSize: "14px",
    },
    body2: {
      fontSize: "14px",
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: 600,
      lineHeight: 1.57,
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.40,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.33,
    },
    h2: {
      fontSize: "1.875rem",
      fontWeight: 600,
      lineHeight: 1.27,
    },
    h2: {
      fontSize: "2.375rem",
      fontWeight: 600,
      lineHeight: 1.21,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
