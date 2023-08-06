import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useLocation } from "react-router";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCartDrawer } from "../context/CartDrawerContext";
import { Formik } from "formik";
import * as Yup from "yup";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ProductCard from "../components/ProductCard/ProductCard";
// import {
//   addCartItemUser,
//   addCartItemGuest,
//   removeCartItemUser,
//   removeCartItemGuest,
// } from "../actions/cartActions";
// import { fetchReviews, clearReviews } from "../actions/reviewsActions";
// import ProductCarousel from "../components/ProductCarousel/ProductCarousel";
// import ProductReviews from "../components/ProductReviews/ProductReviews";
import { useSnackbar } from "notistack";

const CollectionScreen = () => {
  const { collectionId } = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const productList = useSelector((state) => state.productList);
  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { email, username, isAdmin } = userDetailsState?.userDetails || {};
  const cartState = useSelector((state) => state.shoppingCart);
  const { cartItems, loading, error } = cartState || {};
  const token = userAuthState?.accessToken;
  const reviewsState = useSelector((state) => state.reviews);
  const { reviews } = reviewsState || {};

  const productsWithinCollection = productList?.products?.filter(
    (product) => product.collectionId === collectionId
  );

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "stretch",
      }}
    >
      {productsWithinCollection.map((product) => (
        <Grid
          item
          xs={5}
          sm={3}
          md={3}
          lg={3}
          key={product._id}
          sx={{ display: "flex", alignItems: "stretch" }}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CollectionScreen;
