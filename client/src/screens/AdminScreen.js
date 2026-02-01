import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { Route, Routes } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import AdminCollections from "../components/AdminComponents/Collections/AdminCollections";
import AdminUsers from "../components/AdminComponents/Users/AdminUsers";
import AdminOrders from "../components/AdminComponents/Orders/AdminOrders";
import AdminReviews from "../components/AdminComponents/Reviews/AdminReviews";
import { getUnmoderatedReviews } from "../actions/reviewsActions";
import { useTheme } from "@mui/material/styles";
import Wrapper from "../components/Wrapper/Wrapper";
import AddEditProduct from "../components/AdminComponents/Collections/AddEditProduct";

const styles = {
  buttonsWrapper: (theme) => ({
    padding: "10px",
    [theme.breakpoints.up("md")]: {
      height: "100%",
      flexDirection: "column",
      justifyContent: "flex-start",
      height: "100vh",
    },
  }),
};

const adminButtons = [
  {
    name: "Collections",
    link: "collections",
    component: "Collections",
  },
  // {
  //   name: "Users",
  //   link: "users",
  //   component: "Users",
  // },
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
  const navigate = useNavigate();
  const location = useLocation();
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;
  const reviewsState = useSelector((state) => state.reviews);
  const { reviews } = reviewsState || {};

  useEffect(() => {
    dispatch(getUnmoderatedReviews(token));

    if (location.pathname === "/admin" && !location.search) {
      navigate("/admin/collections");
    }
  }, [dispatch, token]);

  const badgeCounts = {
    reviews: reviews?.length,
    collections: 0,
    products: 0,
    users: 0,
    orders: 0,
  };

  return (
    <Wrapper
      gridContainer
      width="100%"
      direction="row"
      justifyContent="space-around"
    >
      {" "}
      <Grid
        item
        xs={12}
        md={3}
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "flex-end",
          borderRight: "1px solid grey",
          [theme.breakpoints.down("md")]: {
            alignItems: "center",
            borderRight: "none",
            borderBottom: "1px solid grey",
          },
        }}
      >
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
      </Grid>
      <Grid item xs={12} md={8}>
        <Routes>
          {" "}
          <Route path="collections" element={<AdminCollections />} />
          <Route path="addeditproduct/" element={<AddEditProduct />} />
          <Route
            path="addeditproduct/:productId"
            element={<AddEditProduct />}
          />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders/*" element={<AdminOrders />} />
          <Route path="reviews" element={<AdminReviews />} />
        </Routes>
      </Grid>
    </Wrapper>
  );
};

export default AdminScreen;
