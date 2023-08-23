import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  setIsPaid,
  placeNewUserOrder,
  placeNewOrderGuest,
} from "../../../actions/userOrderActions";
import Wrapper from "../../Wrapper/Wrapper";

const CheckoutPayment = ({ proceedToNextStep }) => {
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const userDetailsState = useSelector((state) => state.userDetails);
  const userDetails = userDetailsState?.userDetails;

  const token = userAuthState?.accessToken;
  const { authenticated } = userAuthState;
  const orderDetails = useSelector((state) => state.userOrder);
  const { isPaid } = orderDetails;

  const [orderPlaced, setOrderPlaced] = useState(false);

  const payAndProceed = async () => {
    if (!orderPlaced) {
      setOrderPlaced(true);

      await dispatch(setIsPaid(true));

      if (authenticated) {
        dispatch(placeNewUserOrder(token, orderDetails, proceedToNextStep));
      } else {
        dispatch(placeNewOrderGuest(orderDetails, proceedToNextStep));
      }
    }
  };

  return (
    <Wrapper justifyContent="center">
      {" "}
      <Button size="large" variant="outlined" color="success" sx={{marginTop: "50px"}}onClick={() => payAndProceed()}>Payment functionality coming soon, for now it's just a button</Button>
    </Wrapper>
  );
};

export default CheckoutPayment;
