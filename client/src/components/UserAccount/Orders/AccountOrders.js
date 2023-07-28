import React, { useState, useEffect } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { fetchAllOrders, cancelOrder, fetchUserOrders } from "../../../actions/orderActions";
import { format } from "date-fns";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
};

const AccountOrders = () => {
  const dispatch = useDispatch();
  const userDetailsState = useSelector((state) => state.userDetails);
  const { isGuest, userDetails, orderHistory } = userDetailsState;
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

  return (
    <Box sx={styles.wrapper}>
      {orderHistory
        ?.sort((a, b) => new Date(b.datePlaced) - new Date(a.datePlaced))
        .map((order) => (
          <Box key={order._id}>
            <Typography variant="h6">Order #: {order.shortId}</Typography>
            <Box>
              {order?.orderedItems?.map((item) => (
                <Box key={item._id}>
                  <Typography variant="body1">
                    {item.name} - {item.quantity} units at ${item.price} each
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography variant="body1">Total: {order.totalPrice}</Typography>
            {order.isPaid && <Typography>Paid: Yes</Typography>}{" "}
            <Typography sx={{ display: "inline-flex" }}>
              Status: <Typography>{getOrderStatus(order)}</Typography>
            </Typography>
            <Typography>
              Date Placed:{" "}
              {order.datePlaced &&
                format(new Date(order.datePlaced), "dd/MM/yyyy, HH:mm")}
            </Typography>
            {order.isShippedToCourier && (
              <>
                {" "}
                <Typography>
                  Data Shipped:{" "}
                  {order.isShippedToCourier &&
                    format(new Date(order.dateShipped), "dd/MM/yyyy, HH:mm")}
                </Typography>
                {order.isDelivered && (
                  <Typography>
                    Data Delivered:{" "}
                    {order.isDelivered &&
                      format(
                        new Date(order.dateDelivered),
                        "dd/MM/yyyy, HH:mm"
                      )}
                  </Typography>
                )}
                <Typography>
                  Courier Tracking Number: {order.courierTrackingNumber}
                </Typography>
              </>
            )}
            {!order.isShippedToCourier && !order.isCancelled && (
              <Button onClick={() => dispatch(cancelOrder(token, order._id))}>
                Cancel Order
              </Button>
            )}
            {order.isCancelled && (
              <Button variant="contained" disabled>
                Cancelled
              </Button>
            )}
            <hr></hr>
          </Box>
        ))}
    </Box>
  );
};

export default AccountOrders;
