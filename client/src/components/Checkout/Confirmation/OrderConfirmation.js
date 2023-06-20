import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";

const OrderConfirmation = () => {
  const dispatch = useDispatch();
  //get token from state
  const userAuthState = useSelector((state) => state.userAuth);
  const userDetailsState = useSelector((state) => state.userDetails);
  const userDetails = userDetailsState?.userDetails;
  const orderDetails = useSelector((state) => state.order);

  const token = userAuthState?.accessToken;
  const { authenticated } = userAuthState;
  return (
    <Box>
      {authenticated ? (
        <Box>
          {" "}
          Thank you for your order! You will be sent further inforation at{" "}
          {orderDetails.emailAddress}, or you can check you order status in your
          account dashboard.
        </Box>
      ) : (
        <Box>
          {" "}
          Thank you for your oder! You will be sent further information at
          {orderDetails.emailAddress}. If you need to cancel your order, the
          confirmation email sent will contain further instructions.
        </Box>
      )}
    </Box>
  );
};

export default OrderConfirmation;
