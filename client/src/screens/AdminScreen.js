import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import AdminCollections from "../components/AdminComponents/Collections/AdminCollections";
import AdminProducts from "../components/AdminComponents/Products/AdminProducts";
import AdminUsers from "../components/AdminComponents/Users/AdminUsers";
import AdminOrders from "../components/AdminComponents/Orders/AdminOrders";
import AdminReviews from "../components/AdminComponents/Reviews/AdminReviews";
import {
  getUnmoderatedReviews,
  deleteReview,
  moderateReview,
} from "../actions/reviewsActions";

const styles = {
  buttonsWrapper: {
    border: "1px solid black",
  },
};

const adminButtons = [
  {
    name: "Collections",
    link: "collections",
    component: "Collections",
  },
  // {
  //   name: "Products",
  //   link: "products",
  //   component: "Products",
  // },
  {
    name: "Users",
    link: "users",
    component: "Users",
  },
  {
    name: "Orders",
    link: "orders",
    component: "Orders",
  },
  {
    name: "Reviews",
    link: "reviews",
    component: "Reviews",
  },
];

const AdminScreen = () => {
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;
  const reviewsState = useSelector((state) => state.reviews);
  const { reviews } = reviewsState || {};


  useEffect(() => {
    dispatch(getUnmoderatedReviews(token));
  }, [dispatch, token]);

  const badgeCounts = {
    // object to hold badge counts
    reviews: reviews?.length,
    collections: 0,
    products: 0,
    users: 0,
    orders: 0,
  };

  return (
    <Grid container sx={{ border: "1px solid blue" }}>
      <Grid
        item
        xs={12}
        md={3}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
        }}
      >
        <Box sx={styles.buttonsWrapper}>
          {adminButtons.map((button) => (
            <Box key={button.name}>
              {badgeCounts[button.link] > 0 && (
                <Link component={NavLink} to={button.link}>
                  <Button>{button.name}</Button>
                  <Badge
                    badgeContent={badgeCounts[button.link]}
                    color="secondary"
                    sx={{ marginLeft: "0.5rem" }}
                  />
                </Link>
              )}
              {badgeCounts[button.link] === 0 && (
                <Link component={NavLink} to={button.link}>
                  <Button>{button.name}</Button>
                </Link>
              )}
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} md={9}>
        <Routes>
          {" "}
          <Route path="collections" element={<AdminCollections />} />
          <Route path="products/*" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="reviews" element={<AdminReviews />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default AdminScreen;
