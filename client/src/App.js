import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "./components/Layout/Layout";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ContactScreen from "./screens/ContactScreen";
import ProductScreen from "./screens/ProductScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import AdminScreen from "./screens/AdminScreen";
import Favorites from "./screens/FavoritesScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

//viewport display
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { fetchAllProducts } from "./actions/productActions";
import {fetchAllCollections} from "./actions/collectionsActions";


const App = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [viewport, setViewport] = useState("");

  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { email, username, isAdmin } = userDetailsState?.userDetails || {};
  const productList = useSelector((state) => state.productList);
  const collectionsList = useSelector((state) => state.collections);

  useEffect(() => {
    if (productList && productList?.products?.length === 0) {
      dispatch(fetchAllProducts());
    }
    if (collectionsList && collectionsList?.collections?.length === 0) {
      dispatch(fetchAllCollections());
    }

  }, [dispatch]);

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
          <Route path={"/"} element={<HomeScreen />} />
          <Route path={"/contact"} element={<ContactScreen />} />
          <Route path={"/cart"} element={<CartScreen />} />
          <Route
            path={"/auth"}
            element={authenticated ? <Navigate to="/" /> : <LoginScreen />}
          />
          <Route
            path={"/register"}
            element={authenticated ? <Navigate to="/" /> : <RegisterScreen />}
          />
          <Route path={"/product/:productId"} element={<ProductScreen />} />
          {/* <Route
            path={"/editproduct/:productId"}
            element={
              authenticated ? <EditProductScreen /> : <Navigate to="/" />
            }
          /> */}
          <Route
            path={"/favorites"}
            element={authenticated ? <Favorites /> : <Navigate to="/" />}
          />
          <Route
            path={"/editprofile"}
            element={
              authenticated ? <EditProfileScreen /> : <Navigate to="/" />
            }
          />
          <Route
            path={"/admin/*"}
            element={
              authenticated && isAdmin ? <AdminScreen /> : <Navigate to="/" />
            }
          />
          <Route
            path={"/orders"}
            element={
              authenticated ? <OrderHistoryScreen /> : <Navigate to="/" />
            }
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
