import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const styles = {
  wrapper: {
    border: "1px solid black",
  },
};

const CheckoutSummary = ({ proceedToNextStep }) => {
  const dispatch = useDispatch();
  //get token from state
  const userAuthState = useSelector((state) => state.userAuth);
  const productState = useSelector((state) => state.productList);
  const { products } = productState;
  const orderState = useSelector((state) => state.order);
  const { cartItems, isGuest, isPaid, shippingAddress, totalPrice } =
    orderState;

  const token = userAuthState?.accessToken;
  const { authenticated } = userAuthState;

  const detailedCartItems = cartItems?.map((item) => {
    const productDetails = products.find((p) => p._id === item.product);
    return { ...item, product: productDetails };
  });

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.orderTitle}>
        <Typography variant="h5">Order Summary</Typography>
      </Box>
      <Box sx={styles.orderItems}>
        <Typography variant="h6">Items</Typography>
        {detailedCartItems &&
          detailedCartItems.map((item) => (
            <Box key={item.product._id}>
              <Typography variant="body1">{item.product.name}</Typography>
              <Typography variant="body1">x{item.quantity}</Typography>
              <Typography variant="body1">${item.product.price}</Typography>
              <hr></hr>
            </Box>
          ))}
      </Box>
      <hr></hr>
      <Box sx={styles.shippingAddress}>
        <Typography variant="h6">Shipping Address</Typography>
        {shippingAddress && (
          <Box>
            <Typography variant="body1">{shippingAddress.fullName}</Typography>
            <Typography variant="body1">
              {shippingAddress.street}, {shippingAddress.city},
              {shippingAddress.postalCode}, {shippingAddress.country}
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={styles.payNowButton}>
        <Button onClick={proceedToNextStep}>Pay Now</Button>
      </Box>

    </Box>
  );
};

export default CheckoutSummary;
