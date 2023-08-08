import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import OrderSummary from "../../OrderSummary/OrderSummary";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import {
  cancelOrder,
  fetchUserOrders,
} from "../../../actions/orderHistoryActions";
import { format } from "date-fns";
import { Outlet } from "react-router-dom";
import OrderSnapshot from "../../OrderSnapshot/OrderSnapshot";

const styles = {
  // wrapper: {
  //   display: "flex",
  //   flexDirection: "column",
  // },
};

const AccountOrders = () => {
  const dispatch = useDispatch();
  const userDetailsState = useSelector((state) => state.userDetails);
  const orderHistoryState = useSelector((state) => state.orderHistory);
  const {orders} = orderHistoryState;
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;

  useEffect(() => {
    dispatch(fetchUserOrders(token));
  }, []);

  function formatDate(date) {
    return new Intl.DateTimeFormat().format(new Date(date));
  }


  return (
    <Box sx={styles.wrapper}>
      {orders
        ?.sort((a, b) => new Date(b.datePlaced) - new Date(a.datePlaced))
        .map((order) => (
          <OrderSnapshot order={order} isAdmin={false}/>
        ))}
      <Outlet />
    </Box>
  );
};

export default AccountOrders;
