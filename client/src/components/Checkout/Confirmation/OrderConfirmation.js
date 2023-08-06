import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const userDetailsState = useSelector((state) => state.userDetails);
  const userDetails = userDetailsState?.userDetails;
  const orderDetails = useSelector((state) => state.userOrder);

  const token = userAuthState?.accessToken;
  const { authenticated } = userAuthState;
  return (
    <Box>
      {authenticated ? (
        <>
          {" "}
          <Box>
            {" "}
            Thank you for your order! Your order number is #
            {orderDetails.orderNumber}. You will be sent further inforation at{" "}
            {orderDetails.emailAddress}, or you can check you order status in
            your account dashboard.
          </Box>
          <Button
            onClick={() => {
              dispatch({ type: "CLEAR_ORDER" });
              navigate("/");
            }}
          >
            Understood
          </Button>
          <Button
            onClick={() => {
              dispatch({ type: "CLEAR_ORDER" });
              navigate("/useraccount/orders");
            }}
          >
            View all orders
          </Button>
        </>
      ) : (
        <>
          {" "}
          <Box>
            {" "}
            Thank you for your order! Your order number is #
            {orderDetails.orderNumber}. You will be sent further information at{" "}
            {orderDetails.emailAddress}. If you need to cancel your order, the
            confirmation email sent will contain further instructions.
          </Box>
          <Button
            onClick={() => {
              dispatch({ type: "CLEAR_ORDER" });
              navigate("/");
            }}
          >
            Understood
          </Button>
        </>
      )}
    </Box>
  );
};

export default OrderConfirmation;
