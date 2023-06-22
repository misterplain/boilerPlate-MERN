import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  setIsPaid,
  placeNewUserOrder,
  placeNewOrderGuest,
} from "../../../actions/orderActions";

const styles = {
  wrapper: {
    border: "1px solid black",
  },
};

const CheckoutPayment = ({ proceedToNextStep }) => {
  const dispatch = useDispatch();
  //get token from state
  const userAuthState = useSelector((state) => state.userAuth);
  const userDetailsState = useSelector((state) => state.userDetails);
  const userDetails = userDetailsState?.userDetails;

  const token = userAuthState?.accessToken;
  const { authenticated } = userAuthState;
  const orderDetails = useSelector((state) => state.order);

  const payAndProceed = () => {
    dispatch(setIsPaid(true));
    if (authenticated) {
      dispatch(placeNewUserOrder(token, orderDetails, proceedToNextStep));
    } else {
      console.log('guest order dispatch')
      dispatch(placeNewOrderGuest(orderDetails, proceedToNextStep));
    }

    // proceedToNextStep()
  };

  return (
    <Box sx={styles.wrapper}>
      <Button onClick={() => payAndProceed()}>Pay</Button>
    </Box>
  );
};

export default CheckoutPayment;
