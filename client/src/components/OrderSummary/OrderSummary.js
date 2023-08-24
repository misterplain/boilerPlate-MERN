import React from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";

const OrderSummary = () => {
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const userDetailsState = useSelector((state) => state.userDetails);
  const { isGuest, userDetails, orderHistory } = userDetailsState;
  const adminOrdersState = useSelector((state) => state.adminOrders);
  const orderHistoryState = useSelector((state) => state.orderHistory);
  const {orders, error} = orderHistoryState;
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;

  const order = orders.find((o) => o._id === orderId);

  console.log(order);

  return <div>{order._id}</div>;
};

export default OrderSummary;

