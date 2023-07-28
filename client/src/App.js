import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppRoutes from "./routes/AppRoutes";
// import SnackBar from "./components/SnackBar/SnackBar";

const App = () => {
  const theme = useTheme();
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

  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
      {/* <SnackBar /> */}
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
  );
};

export default App;
