import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProducts,
  fetchFilteredProducts,
} from "../actions/productActions";
import { fetchAllCollections } from "../actions/collectionsActions";
import { Route, Routes, Navigate } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import ContactScreen from "../screens/ContactScreen";
import ProductScreen from "../screens/ProductScreen";
import CollectionScreen from "../screens/CollectionScreen";
import ShopScreen from "../screens/ShopScreen";
import AdminScreen from "../screens/AdminScreen";
import UserAccountScreen from "../screens/UserAccountScreen";
import Favorites from "../screens/FavoritesScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CheckoutScreen from "../screens/CheckoutScreen";

const AppRoutes = () => {
  const location = useLocation();
  const dispatch = useDispatch();


  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      dispatch(fetchAllCollections());
      dispatch(fetchAllProducts());
    } else if (path === "/admin/collections") {
      dispatch(fetchAllProducts());
      dispatch(fetchAllCollections());
    }
  }, [dispatch, location.pathname]);

  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { isAdmin } = userDetailsState?.userDetails || {};

  return (
    <Routes>
      <Route index element={<HomeScreen />} />
      <Route path={"/"} element={<HomeScreen />} />
      <Route path={"/contact"} element={<ContactScreen />} />
      <Route
        path={"/auth"}
        element={authenticated ? <Navigate to="/" /> : <LoginScreen />}
      />
      <Route
        path={"/register"}
        element={authenticated ? <Navigate to="/" /> : <RegisterScreen />}
      />
      <Route path={"/product/:productId"} element={<ProductScreen />} />
      <Route
        path={"/collection/:collectionId"}
        element={<CollectionScreen />}
      />
      <Route path={"/shop"} element={<ShopScreen />} />
      <Route
        path={"/favorites"}
        element={authenticated ? <Favorites /> : <Navigate to="/" />}
      />
      <Route
        path={"/useraccount/*"}
        element={authenticated ? <UserAccountScreen /> : <Navigate to="/" />}
      />
      <Route
        path={"/admin/*"}
        element={
          authenticated && isAdmin ? <AdminScreen /> : <Navigate to="/" />
        }
      />
      <Route path={"/checkout"} element={<CheckoutScreen />} />
    </Routes>
  );
};

export default AppRoutes;
