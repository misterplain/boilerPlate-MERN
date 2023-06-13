import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { setInitialOrderInfo } from "../../actions/orderActions";

import styles from "./styles";

const CartSummary = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productList);
  const cartState = useSelector((state) => state.shoppingCart);
  const { cartItems } = cartState;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { isGuest } = userDetailsState;

  const detailedCartItems = cartItems?.map((item) => {
    const productDetails = products.find((p) => p._id === item.product);
    return { ...item, product: productDetails };
  });

  const cartItemTotal = (item) => {
    return item.product.price * item.quantity;
  };

  const cartTotal = detailedCartItems?.reduce((acc, item) => {
    return acc + cartItemTotal(item);
  }, 0);

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.pricesWrapper}>
        <Box sx={styles.price}>
          <Typography variant="h6">Free Shipping</Typography>
          <Typography variant="body1">$0</Typography>
        </Box>
        <Box sx={styles.price}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="body1">${cartTotal}</Typography>
        </Box>
      </Box>
      <Box sx={styles.buttonsWrapper}>
        <Box sx={styles.button}>
          <Button>Continue shopping</Button>
        </Box>
        <Box sx={styles.button}>
          <Link component={NavLink} to="/checkout">
            {" "}
            <Button
              onClick={() => {
                dispatch(
                  setInitialOrderInfo({
                    isGuest,
                   cartItems, 
                    totalPrice: cartTotal,
                  })
                );
              }}
            >
              Proceed to checkout
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default CartSummary;
