import React, { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ContactScreen from "./screens/ContactScreen";
import ShopScreen from "./screens/ShopScreen";
import CartScreen from "./screens/CartScreen";
import AuthScreen from "./screens/AuthScreen";
import PostScreen from "./screens/PostScreen";
//viewport display
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const App = () => {
  const theme = useTheme();
  const [viewport, setViewport] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  },[]);

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
      <Layout user={user}>
        <Routes>
          <Route index element={<HomeScreen />} />
          <Route path={"/shop"} element={<ShopScreen />} />
          <Route path={"/contact"} element={<ContactScreen />} />
          <Route path={"/cart"} element={<CartScreen />} />
          <Route
            path={"/auth"}
            element={user ? <Navigate to="/" /> : <AuthScreen />}
          />
          <Route
            path={"/post/:id"}
            element={user ? <PostScreen /> : <Navigate to="/auth" />}
          />
        </Routes>
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
  );
};

export default App;
