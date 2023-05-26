import React, { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ContactScreen from "./screens/ContactScreen";
import ProductScreen from "./screens/ProductScreen";
import EditProductScreen from "./screens/EditProductScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import Favorites from "./screens/FavoritesScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

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
  }, []);

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
          <Route path={"/"} element={<HomeScreen />} />
          <Route path={"/contact"} element={<ContactScreen />} />
          <Route path={"/cart"} element={<CartScreen />} />
          <Route
            path={"/auth"}
            element={user ? <Navigate to="/" /> : <LoginScreen />}
          />
          <Route
            path={"/register"}
            element={user ? <Navigate to="/" /> : <RegisterScreen />}
          />
          <Route path={"/product/:id"} element={<ProductScreen />} />
          <Route
            path={"/editproduct/:id"}
            element={user ? <EditProductScreen /> : <Navigate to="/" />}
          />
          <Route
            path={"/favorites"}
            element={user ? <Favorites /> : <Navigate to="/" />}
          />
          <Route
            path={"/editprofile"}
            element={user ? <EditProfileScreen /> : <Navigate to="/" />}
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
