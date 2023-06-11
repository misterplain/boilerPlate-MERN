import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import {
  getCartItems,
  addCartItemUser,
  addCartItemGuest,
  removeCartItemUser,
  removeCartItemGuest,
} from "../actions/cartActions";
import CheckoutUser from "../components/Checkout/User/CheckoutUser";
import CheckoutAddress from "../components/Checkout/Address/CheckoutAddress";
import CheckoutPayment from "../components/Checkout/Payment/CheckoutPayment";
import CheckoutSummary from "../components/Checkout/Summary/CheckoutSummary";

const CheckoutScreen = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { products } = useSelector((state) => state.productList);
  const { email, username, isAdmin } = userDetailsState?.userDetails || {};
  const cartState = useSelector((state) => state.shoppingCart);
  const { cartItems } = cartState;
  const token = userAuthState?.accessToken;

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CheckoutUser proceedToNextStep={() => setStep(2)} />;
      case 2:
        return <CheckoutAddress proceedToNextStep={() => setStep(3)} />;
      case 3:
        return <CheckoutPayment proceedToNextStep={() => setStep(4)} />;
      case 4:
        return <CheckoutSummary proceedToNextStep={() => setStep(5)} />;
      default:
        return <div>Order Confirmed!</div>;
    }
  };

  const styles = {
    wrapper: {
      border: "1px solid black",
    },
  };
  return <Box sx={styles.wrapper}>{renderStep()}</Box>;
};

export default CheckoutScreen;
