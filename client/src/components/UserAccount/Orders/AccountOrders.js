import React, { useState, useEffect } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { fetchUserOrders, cancelOrder } from "../../../actions/orderActions";

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

  console.log(orderHistory);

  return (
    <Box sx={styles.wrapper}>
      {orderHistory?.map((order) => (
        <Box key={order._id}>
          <Typography variant="h6">Order #: {order.shortId}</Typography>
          <Box>
            {order?.orderedItems?.map((item) => (
              <Box key={item._id}>
                <Typography variant="body1">Name: {item.name}</Typography>
                <Typography variant="body1">
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body1">Price: {item.price}</Typography>
              </Box>
            ))}
          </Box>
          <Typography variant="body1">Total: {order.totalPrice}</Typography>
          {!order.isShippedToCourier && !order.isCancelled && (
            <Button onClick={() => dispatch(cancelOrder(token, order._id))}>
              Cancel Order
            </Button>
          )}
          {order.isCancelled && <Button variant="contained" disabled>Cancelled</Button>}
          <hr></hr>
        </Box>
      ))}
    </Box>
  );
};

export default AccountOrders;
