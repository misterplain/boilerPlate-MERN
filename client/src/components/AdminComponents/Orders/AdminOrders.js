import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { format } from "date-fns";
import AdvancedSearch from "./AdvancedSearch";
import QuickView from "./QuickView";
import OrderSummary from "../../OrderSummary/OrderSummary";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  optionsWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "3px solid black",

  },
};

const AdminOrders = () => {
  const dispatch = useDispatch();
  const userDetailsState = useSelector((state) => state.userDetails);
  const { isGuest, userDetails, orderHistory } = userDetailsState;
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.optionsWrapper}>
        {" "}
        <Link component={NavLink} to="quick-view">
          {" "}
          <Button color="success">quick view</Button>
        </Link>
        <Link component={NavLink} to="advanced-search">
          {" "}
          <Button color="secondary">Advanced Search</Button>
        </Link>
      </Box>

      <Routes>
        <Route path="/" element={<QuickView />} />
        <Route path="quick-view" element={<QuickView />} />
        <Route path="advanced-search" element={<AdvancedSearch />} />
        <Route path="order-summary/:orderId" element={<OrderSummary />} />
      </Routes>
    </Box>
  );
};

export default AdminOrders;
