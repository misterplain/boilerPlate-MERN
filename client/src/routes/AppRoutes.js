import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllProducts } from "../actions/productActions";
import { fetchAllCollections } from "../actions/collectionsActions";
import { Route, Routes, Navigate } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen";
import ContactScreen from "../screens/ContactScreen";
import ProductScreen from "../screens/ProductScreen";
import CollectionScreen from "../screens/CollectionScreen";
import AdminScreen from "../screens/AdminScreen";
import UserAccountScreen from "../screens/UserAccountScreen";
import Favorites from "../screens/FavoritesScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CheckoutScreen from "../screens/CheckoutScreen";

const AppRoutes = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const path = location.pathname;
    const triggerPaths = ["/", "/admin"];
    const shouldFetch = triggerPaths.some((triggerPath) =>
      path === triggerPath || path.startsWith(triggerPath + "/")
    );

    if (shouldFetch) {
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
      <Route path={"/product/:collectionId"} element={<CollectionScreen />} />
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
