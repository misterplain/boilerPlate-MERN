import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";
import theme from "./theme";
import store from "./store";
import { MaterialDesignContent } from "notistack";
import { styled } from "@mui/material/styles";

// import "./index.css";


//snackbar styles
const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  ({ theme }) => ({
    "&.notistack-MuiContent-success": {
      backgroundColor: "white",
      color: "#4caf50",
      borderRadius: "5px",
      textTransform: "uppercase",
      border: "1px solid #4caf50",
      textAlign: "center",
      fontFamily: theme.typography.h1.fontFamily,
      boxShadow: "none",
      fontWeight: "100px",
    },
    "&.notistack-MuiContent-error": {
      backgroundColor: "white",
      color: "#cc3300",
      borderRadius: "5px",
      textTransform: "uppercase",
      border: "1px solid #cc3300",
      textAlign: "center",
      fontFamily: theme.typography.h1.fontFamily,
      boxShadow: "none",
      fontWeight: "100px",
    },
    "&.notistack-MuiContent-info": {
      backgroundColor: "white",
      color: "#1a75ff",
      borderRadius: "5px",
      textTransform: "uppercase",
      border: "1px solid #1a75ff",
      textAlign: "center",
      fontFamily: theme.typography.h1.fontFamily,
      boxShadow: "none",
      fontWeight: "100px",
    },
  })
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {" "}
        <SnackbarProvider
          maxSnack={5}
          hideIconVariant
          Components={{
            success: StyledMaterialDesignContent,
            error: StyledMaterialDesignContent,
            info: StyledMaterialDesignContent,
          }}
        >
          <App/>
        </SnackbarProvider>{" "}
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
