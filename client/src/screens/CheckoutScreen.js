import React, { useState, useEffect } from "react";
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
import OrderConfirmation from "../components/Checkout/Confirmation/OrderConfirmation";

const styles = {
  wrapper: {
    border: "1px solid black",
    display: "flex",
    flexDirection: "column",
  },
  stepsWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "1rem",
  },
};

const CheckoutScreen = () => {
  const dispatch = useDispatch();

  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { products } = useSelector((state) => state.productList);
  const { email, username, isAdmin } = userDetailsState?.userDetails || {};
  const orderState = useSelector((state) => state.order);
  const { cartItems, emailAddress, shippingAddress, isPaid } = orderState;
  const token = userAuthState?.accessToken;

  const [step, setStep] = useState(1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CheckoutUser proceedToNextStep={() => setStep(2)} />;
      case 2:
        return <CheckoutAddress proceedToNextStep={() => setStep(3)} />;
      case 3:
        return <CheckoutSummary proceedToNextStep={() => setStep(4)} />;
      case 4:
        return <CheckoutPayment proceedToNextStep={() => setStep(5)} />;
      case 5:
        return <OrderConfirmation />;
      default:
        return <div>Order Confirmed!</div>;
    }
  };

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.stepsWrapper}>
        {!authenticated && (
          <Button
            variant="contained"
            onClick={() => setStep(1)}
            disabled={!emailAddress}
          >
            User and Email
          </Button>
        )}
        <Button
          variant="contained"
          onClick={() => setStep(2)}
          disabled={!shippingAddress}
        >
          Address
        </Button>
        <Button
          variant="contained"
          onClick={() => setStep(3)}
          disabled={
            !emailAddress || !cartItems || !shippingAddress 
          }
        >
          Summary
        </Button>
        <Button
          variant="contained"
          onClick={() => setStep(4)}
          disabled={
         !isPaid
          }
        >
          Payment
        </Button>
      </Box>
      <Box sx={styles.renderedComponent}>{renderStep()}</Box>
    </Box>
  );
};

export default CheckoutScreen;
