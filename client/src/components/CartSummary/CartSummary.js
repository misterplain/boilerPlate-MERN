import React, { useState, useEffect } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { setInitialOrderInfo } from "../../actions/orderActions";
import { useCartDrawer } from "../../context/CartDrawerContext";

import styles from "./styles";

const CartSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartDrawerContext = useCartDrawer();
  const { products } = useSelector((state) => state.productList);
  const cartState = useSelector((state) => state.shoppingCart);
  const { cartItems } = cartState;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { isGuest, userDetails } = userDetailsState;
  const userEmail = userDetails?.email;

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

  // useEffect(() => {
  //   if (!detailedCartItems || detailedCartItems.length === 0) {
  //     navigate('/');
  //   }
  // }, [detailedCartItems, navigate]);

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
          <Button
            onClick={() => {
              cartDrawerContext.setIsOpen(false);
              navigate("/");
            }}
          >
            Continue shopping
          </Button>
          {/* <Button >Continue shopping</Button> */}
        </Box>
        {detailedCartItems && detailedCartItems.length !== 0 && (
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
                  cartDrawerContext.setIsOpen(false);
                }}
              >
                Proceed to checkout
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CartSummary;
