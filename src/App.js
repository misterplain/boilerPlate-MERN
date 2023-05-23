import React from "react";
import Layout from "./components/Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ContactScreen from "./screens/ContactScreen";
import ShopScreen from "./screens/ShopScreen";
import CartScreen from "./screens/CartScreen";
import AuthScreen from "./screens/AuthScreen";
//viewport display
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

console.log("layout", Layout);

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
        <Routes>
          <Route index element={<HomeScreen />} />
          <Route path={"/shop"} element={<ShopScreen />} />
          <Route path={"/contact"} element={<ContactScreen />} />
          <Route path={"/cart"} element={<CartScreen />} />
          <Route path={"/auth"} element={<AuthScreen />} />
        </Routes>
      </Layout>
      <Box
        position='fixed'
        bottom={0}
        left={0}
        bgcolor='rgba(255, 255, 255, 0.5)'
        padding={1}
        borderRadius={5}
      >
        <Typography>{viewport}</Typography>
      </Box>
    </BrowserRouter>
  );
};

export default App;
