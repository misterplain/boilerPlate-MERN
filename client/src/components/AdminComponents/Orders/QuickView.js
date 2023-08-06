import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AlertMessage from "../../AlertMessage/AlertMessage";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { cancelOrder, editOrder } from "../../../actions/orderHistoryActions";
import { filterPeriod } from "../../../actions/orderHistoryActions";
import { format } from "date-fns";
import AdvancedSearch from "./AdvancedSearch";
import OrderSummary from "../../OrderSummary/OrderSummary";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  timeSelect: {
    display: "flex",
    justifyContent: "center",
    margin: "1rem 0",
  },
  orderWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid grey",
    margin: "0.5rem",
    padding: "0.5rem",
  },
};

const QuickView = () => {
  const dispatch = useDispatch();
  const userDetailsState = useSelector((state) => state.userDetails);
  const orderHistoryState = useSelector((state) => state.orderHistory);
  const { orders, error, quickView } = orderHistoryState;
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;

  function formatDate(date) {
    return new Intl.DateTimeFormat().format(new Date(date));
  }

  function getOrderStatus(order) {
    if (order.isCancelled) {
      return "Cancelled";
    }
    if (!order.isShippedToCourier && !order.isCancelled) {
      return "In Production";
    }
    if (order.isShippedToCourier && order.isDelivered) {
      return "Delivered";
    }
    if (order.isShippedToCourier && !order.isDelivered) {
      return "Shipped To Courier";
    }
    return "Unknown";
  }

  const [time, setTime] = useState(quickView ? quickView : 30);

  const handleChange = (event) => {
    setTime(event.target.value);
    dispatch(filterPeriod(event.target.value, token));
  };

  return (
    <Box sx={styles.wrapper}>
      {" "}
      {error && <AlertMessage type="error">{error}</AlertMessage>}
      <Box sx={styles.timeSelect}>
        <FormControl>
          <InputLabel id="timePeriod">Period</InputLabel>
          <Select
            labelId="timePeriod"
            id="timePeriod"
            value={time}
            label="Time Period"
            onChange={handleChange}
          >
            <MenuItem value={1}>{"<"} 24 hours</MenuItem>
            <MenuItem value={7}>Last 7 days</MenuItem>
            <MenuItem value={10}>Last 10 days</MenuItem>
            <MenuItem value={30}>Last 30 days</MenuItem>
            <MenuItem value={180}>Last 180 days</MenuItem>
            <MenuItem value={365}>Last Year</MenuItem>
            <MenuItem value={730}>Last 2 years</MenuItem>
            <MenuItem value={731}>Archive (+2 years)</MenuItem>
          </Select>
        </FormControl>
      </Box>{" "}
      {orders
        ?.sort((a, b) => new Date(b.datePlaced) - new Date(a.datePlaced))
        .map((order) => (
          <Box key={order._id} sx={styles.orderWrapper}>
            <Box sx={styles.orderSummary}>
              {" "}
              <Link
                component={NavLink}
                to={`/admin/orders/order-summary/${order._id}`}
              >
                {" "}
                <Typography variant="h6">Order #: {order.shortId}</Typography>
              </Link>
              <Box></Box>{" "}
              <Typography variant="body1">Total: {order.totalPrice}</Typography>
              <Typography sx={{ display: "inline-flex" }}>
                Status: {getOrderStatus(order)}
              </Typography>{" "}
            </Box>
            <Box sx={styles.orderOptions}>
              {!order.isShippedToCourier && !order.isCancelled && (
                <Button onClick={() => dispatch(cancelOrder(token, order._id))}>
                  Cancel
                </Button>
              )}
              {!order.isShippedToCourier && !order.isCancelled && (
                <Button
                  onClick={() =>
                    dispatch(
                      editOrder({
                        token,
                        orderId: order._id,
                        requestData: {
                          type: "shippedToCourier",
                          isShippedToCourier: true,
                          dateShipped: new Date(),
                          courierTrackingNumber: "1234567890",
                        },
                      })
                    )
                  }
                >
                  Mark as Shipped
                </Button>
              )}
              {order.isShippedToCourier && !order.isDelivered && (
                <Button
                  onClick={() =>
                    dispatch(
                      editOrder({
                        token,
                        orderId: order._id,
                        requestData: {
                          type: "isDelivered",
                          isDelivered: true,
                          // dateShipped: new Date(),
                          // courierTrackingNumber: "1234567890",
                        },
                      })
                    )
                  }
                >
                  Mark as Delivered
                </Button>
              )}
            </Box>
          </Box>
        ))}
    </Box>
  );
};

export default QuickView;
