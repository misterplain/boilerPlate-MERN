import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppRoutes from "./routes/AppRoutes";
import { refreshToken } from "./actions/authActions";

console.log("test commit");
console.log(process.env.NODE_ENV);

const App = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [viewport, setViewport] = useState("");

  useEffect(() => {
    function handleResize() {
      const keys = Object.keys(theme.breakpoints.values);
      let currentViewport = "";
      for (let i = keys.length - 1; i >= 0; i--) {
        const breakpoint = theme.breakpoints.values[keys[i]];
        if (window.innerWidth >= breakpoint) {
          currentViewport = keys[i];
          break;
        }
      }
      setViewport(currentViewport);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [theme.breakpoints]);

  //another use effect for refresh token
  useEffect(() => {
    const token = localStorage.getItem("profile");
    if (token) {
      dispatch(refreshToken(token));
    }
  });

  return (
    <Box sx={{ width: "100%" }}>
      {" "}
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
        <Box
          position="fixed"
          bottom={0}
          left={0}
          bgcolor="rgba(255, 255, 255, 0.5)"
          padding={1}
          borderRadius={5}
        >
          <Typography>{viewport}</Typography>
        </Box>
      </BrowserRouter>
    </Box>
  );
};

export default App;
