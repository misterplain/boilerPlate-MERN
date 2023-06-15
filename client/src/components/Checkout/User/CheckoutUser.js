import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";

const CheckoutUser = ({ proceedToNextStep }) => {
  const userAuthState = useSelector((state) => state.userAuth);
  const userDetailsState = useSelector((state) => state.userDetails);
  const userDetails = userDetailsState?.userDetails;
  const productState = useSelector((state) => state.productList);
  const { products } = productState;
  const orderState = useSelector((state) => state.order);
  const { cartItems, isGuest, isPaid, shippingAddress, totalPrice } =
    orderState;

  const token = userAuthState?.accessToken;
  const { authenticated } = userAuthState;

  if (authenticated) {
    proceedToNextStep();
  }

  return (
    <Box>
      <Link component={NavLink} to="/auth">
        <Button>log in</Button>{" "}
      </Link>
      <Link component={NavLink} to="/register">
        <Button>sign up</Button>
      </Link>
      <Button onClick={proceedToNextStep}>continue as guest</Button>
    </Box>
  );
};

export default CheckoutUser;
