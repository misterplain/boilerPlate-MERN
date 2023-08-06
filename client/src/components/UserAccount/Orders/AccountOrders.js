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

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  orderWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid grey",
    margin: "0.5rem",
    padding: "0.5rem",
  }
};

const AccountOrders = () => {
  const dispatch = useDispatch();
  const userDetailsState = useSelector((state) => state.userDetails);
  // const { isGuest, userDetails, orderHistory } = userDetailsState;
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

  function getOrderStatus(order) {
    if (order.isCancelled) {
      return "Cancelled";
    }
    if (!order.isShippedToCourier) {
      return "Awaiting Shipment";
    }
    if (order.isShippedToCourier) {
      return "Shipped";
    }
    return "Unknown";
  }
  // console.log(orderHistory);
  return (
    <Box sx={styles.wrapper}>
      {orders
        ?.sort((a, b) => new Date(b.datePlaced) - new Date(a.datePlaced))
        .map((order) => (
          <Box key={order._id} sx={styles.orderWrapper}>
            <Box sx={styles.orderSummary}>
              <Link component={NavLink} to={`order-summary/${order._id}`}>
                <Typography variant="h6">Order #: {order.shortId}</Typography>
              </Link>
              <Typography variant="body1">Total: {order.totalPrice}</Typography>
              <Typography sx={{ display: "inline-flex" }}>
                Status: <Typography>{getOrderStatus(order)}</Typography>
              </Typography>
              <Typography>
                Date Placed:{" "}
                {order.datePlaced &&
                  format(new Date(order.datePlaced), "dd/MM/yyyy, HH:mm")}
              </Typography>
            </Box>
            <Box sx={styles.orderOptions}>
              {!order.isShippedToCourier && !order.isCancelled && (
                <Button onClick={() => dispatch(cancelOrder(token, order._id))}>
                  Cancel
                </Button>
              )}
            </Box>
          </Box>
        ))}
      <Outlet />
    </Box>
  );
};

export default AccountOrders;
