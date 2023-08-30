import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import CheckoutUser from "../components/Checkout/User/CheckoutUser";
import CheckoutAddress from "../components/Checkout/Address/CheckoutAddress";
import CheckoutPayment from "../components/Checkout/Payment/CheckoutPayment";
import CheckoutSummary from "../components/Checkout/Summary/CheckoutSummary";
import OrderConfirmation from "../components/Checkout/Confirmation/OrderConfirmation";
import Wrapper from "../components/Wrapper/Wrapper";

const CheckoutScreen = () => {
  const dispatch = useDispatch();

  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const orderState = useSelector((state) => state.userOrder);
  const { cartItems, emailAddress, shippingAddress, isPaid } = orderState;

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
    <Wrapper id="pageWrapper">
      <Wrapper
        justifyContent="space-around"
        alignItems="center"
        width="100%"
        customStyles={{
          padding: "1rem",
        }}
      >
        {!authenticated && (
          <Button
            variant="contained"
            onClick={() => setStep(1)}
            disabled={!emailAddress || isPaid}
          >
            User and Email
          </Button>
        )}
        <Button
          variant="contained"
          onClick={() => setStep(2)}
          disabled={!shippingAddress || isPaid}
        >
          Address
        </Button>
        <Button
          variant="contained"
          onClick={() => setStep(3)}
          disabled={!emailAddress || !cartItems || !shippingAddress || isPaid}
        >
          Summary
        </Button>
        <Button
          variant="contained"
          onClick={() => setStep(4)}
          disabled={isPaid || step < 4}
        >
          Payment
        </Button>{" "}
      </Wrapper>{" "}
      <Box sx={{width: "100%"}}>{renderStep()}</Box>
    </Wrapper>
  );
};

export default CheckoutScreen;
