import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";

import styles from "./styles";

const CartItems = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { products } = useSelector((state) => state.productList);
  const { email, username, isAdmin } = userDetailsState?.userDetails || {};
  const cartState = useSelector((state) => state.shoppingCart);
  const { cartItems } = cartState;

  const detailedCartItems = cartItems.map((item) => {
    const productDetails = products.find((p) => p._id === item.product);
    return { ...item, product: productDetails };
  });

  console.log(detailedCartItems);

const cartItemTotal = (item) => {
    return item.product.price * item.quantity
}


  return (
    <Box sx={styles.wrapper}>
      {cartItems.length === 0 ? (
        <Box sx={styles.emptyCart}>
          <Typography variant="h5">Your cart is empty</Typography>
        </Box>
      ) : (
        <>
          <Box sx={styles.cartTitle}>
            <Typography variant="h5">Your cart</Typography>
          </Box>
          <Box sx={styles.cartItemsWrapper}>
            {detailedCartItems.map((item) => (
              <Box sx={styles.cartItem} key={item._id}>
                {/* {item.product.name} - {item.quantity} */}
                <Box sx={styles.imageTitleDeleteWrapper}>
                  <Box sx={styles.imageTitle}>
                    <Box
                      component="img"
                      src={
                        item.product.photos.length >= 1
                          ? item.product.photos[0]
                          : "https://placehold.co/80x80"
                      }
                    />
                    <Box sx={styles.title}>{item.product.name}</Box>
                  </Box>
                  <Box sx={styles.deleteWrapper}>
                  <DeleteOutlineIcon/>
                  </Box>
                </Box>
                <Box sx={styles.cartItemInfoWrapper}>
                  <Box sx={styles.cartItemInfoText}>Price</Box>
                  <Box sx={styles.cartItemInfo}>${cartItemTotal(item)}</Box>
                </Box>
                <Box sx={styles.cartItemInfoWrapper}>
                  <Box sx={styles.cartItemInfoText}>Quantity</Box>
                  <Box sx={styles.cartItemInfo}>{item.quantity}</Box>
                </Box>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartItems;
