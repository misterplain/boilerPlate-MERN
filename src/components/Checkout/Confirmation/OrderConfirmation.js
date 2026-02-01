import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Wrapper from "../../Wrapper/Wrapper";
import Typography from "@mui/material/Typography";
import ResponsiveWrapper from "../../Wrapper/ResponsiveWrapper";

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
    <ResponsiveWrapper>
      {" "}
      <Wrapper
        id="pageWrapper"
        flexDirection="column"
        alignItems="center"
        customStyles={{ marginTop: "30px" }}
      >
        {" "}
        {authenticated ? (
          <Wrapper
            id="userOrderWrapper"
            width="100%"
            flexDirection="column"
            alignItems="center"
            customStyles={{ margin: "30px 0px" }}
          >
            {" "}
            <Typography variant="h4">Thank you for your order!</Typography>
            <Typography
              variant="body2"
              sx={{ width: "50%", margin: "30px 0px" }}
            >
              {" "}
              Your order number is #{orderDetails.orderNumber}. You will be sent
              further inforation at {orderDetails.emailAddress}, or you can
              check you order status in your account dashboard.
            </Typography>
            <Wrapper flexDirection="column" alignItems="center">
              {" "}
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
            </Wrapper>
          </Wrapper>
        ) : (
          <Wrapper
            id="guestOrderWrapper"
            width="100%"
            flexDirection="column"
            alignItems="center"
            customStyles={{ margin: "30px 0px" }}
          >
            {" "}
            <Typography variant="h4">Thank you for your order!</Typography>
            <Typography
              variant="body2"
              sx={{ width: "50%", margin: "30px 0px" }}
            >
              {" "}
              Your order number is #{orderDetails.orderNumber}. You will be sent
              further information at {orderDetails.emailAddress}. If you need to
              cancel your order, the confirmation email sent will contain
              further instructions.
            </Typography>
            <Wrapper flexDirection="column" alignItems="center">
              {" "}
              <Button
                onClick={() => {
                  dispatch({ type: "CLEAR_ORDER" });
                  navigate("/");
                }}
              >
                Understood
              </Button>
            </Wrapper>
          </Wrapper>
        )}
      </Wrapper>
    </ResponsiveWrapper>
  );
};

export default OrderConfirmation;
