import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { Route, Routes, Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import AdminCollections from "../components/AdminComponents/Collections/AdminCollections";
import AdminProducts from "../components/AdminComponents/Products/AdminProducts";
import AdminUsers from "../components/AdminComponents/Users/AdminUsers";
import AdminOrders from "../components/AdminComponents/Orders/AdminOrders";
import AdminReviews from "../components/AdminComponents/Reviews/AdminReviews";
import QuickView from "../components/AdminComponents/Orders/QuickView";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import { getUnmoderatedReviews } from "../actions/reviewsActions";
import { useTheme } from "@mui/material/styles";

const styles = {
  buttonsWrapper: (theme) => ({
    background: "white",
    width: "100%",
    height: "100%",
    display: "flex",
    // flexDirection: "column",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "10px",
    [theme.breakpoints.up("md")]: {
      height: "100%",
      flexDirection: "column",
      justifyContent: "flex-start",
      height: "100vh",
    },

    // alignItems: "center",
  }),
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
  const theme = useTheme();
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;
  const reviewsState = useSelector((state) => state.reviews);
  const { reviews } = reviewsState || {};

  useEffect(() => {
    dispatch(getUnmoderatedReviews(token));
  }, [dispatch, token]);

  const badgeCounts = {
    reviews: reviews?.length,
    collections: 0,
    products: 0,
    users: 0,
    orders: 0,
  };

  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        flexDirection: "row",
      }}
    >
      <Grid item spacing={1} xs={12} md={2}>
        <Box sx={styles.buttonsWrapper(theme)}>
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
      <Grid item xs={12} md={9} sx={{ }}>
        <Routes>
          {" "}
          <Route path="collections" element={<AdminCollections />} />
          <Route path="products/*" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders/*" element={<AdminOrders />} />
          <Route path="reviews" element={<AdminReviews />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default AdminScreen;
