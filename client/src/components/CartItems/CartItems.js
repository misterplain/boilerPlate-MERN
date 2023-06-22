import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import {
  addCartItemUser,
  addCartItemGuest,
  removeCartItemUser,
  removeCartItemGuest,
} from "../../actions/cartActions";
import { useCartDrawer } from "../../context/CartDrawerContext";

import styles from "./styles";

const CartItems = () => {
  const dispatch = useDispatch();
  const cartDrawerContext = useCartDrawer();

  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { products } = useSelector((state) => state.productList);
  const cartState = useSelector((state) => state.shoppingCart);
  const { cartItems } = cartState;
  const token = userAuthState?.accessToken;

  const detailedCartItems = cartItems?.map((item) => {
    const productDetails = products.find((p) => p._id === item.product);
    return { ...item, product: productDetails, name: productDetails.name };
  });


  // const productInBasket = cartItems?.find(
  //   (item) => item.product === displayedProduct._id
  // );

  // console.log(detailedCartItems)

  const cartItemTotal = (item) => {
    return item.product.price * item.quantity;
  };

  const handleIncreaseQuantity = (item) => {
    if (authenticated) {
      dispatch(
        addCartItemUser({
          productId: item.product._id,
          quantity: 1,
          token,
          pricePerUnit: item.product.price,
          name: item.product.name,
        })
      );
    } else {
      dispatch(
        addCartItemGuest({
          productId: item.product._id,
          quantity: 1,
          pricePerUnit: item.product.price,
          name: item.product.name,
        })
      );
    }
  };

  const handleDecreaseQuantity = (item) => {
    if (authenticated) {
      dispatch(
        removeCartItemUser({
          productId: item.product._id,
          quantity: 1,
          token,
          price: item.product.price,
          name: item.product.name,
        })
      );
    } else {
      dispatch(
        removeCartItemGuest({
          productId: item.product._id,
          quantity: 1,
          pricePerUnit: item.product.price,
          name: item.product.name,
        })
      );
    }
  };

  const handleDeleteItem = (item) => {
    if (authenticated) {
      dispatch(
        removeCartItemUser({
          productId: item.product._id,
          quantity: 1,
          token,
          price: item.product.price,
          name: item.product.name,
        })
      );
    } else {
      dispatch(removeCartItemGuest(item.product._id, item.quantity));
    }
  };

  const redirectToProductPage = (item) => {};

  return (
    <Box sx={styles.wrapper}>
      {cartItems?.length === 0 ? (
        <Box sx={styles.emptyCart}>
          <Typography variant="h5">Your cart is empty</Typography>
        </Box>
      ) : (
        <>
          <Box sx={styles.cartTitle}>
            <Typography variant="h5">Your cart</Typography>
          </Box>
          <Box sx={styles.cartItemsWrapper}>
            {detailedCartItems &&
              detailedCartItems?.map((item) => (
                <Box sx={styles.cartItem} key={item.product._id}>
                  {/* {item.product.name} - {item.quantity} */}
                  <Box sx={styles.imageTitleDeleteWrapper}>
                    {" "}
                    <Link
                      component={NavLink}
                      to={`/product/${item.product._id}`}
                      onClick={() => {
                        cartDrawerContext.setIsOpen(false);
                      }}
                    >
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
                      </Box>{" "}
                    </Link>
                    <Box
                      sx={styles.deleteWrapper}
                      onClick={() => {
                        handleDeleteItem(item);
                      }}
                    >
                      <DeleteOutlineIcon />
                    </Box>
                  </Box>
                  <Box sx={styles.cartItemInfoWrapper}>
                    <Box sx={styles.cartItemInfoText}>Price</Box>
                    <Box sx={styles.cartItemInfo}>${cartItemTotal(item)}</Box>
                  </Box>
                  <Box sx={styles.cartItemInfoWrapper}>
                    <Box sx={styles.cartItemInfoText}>Quantity</Box>
                    <Box sx={styles.quantity}>
                      <Box
                        sx={styles.quantityIcon}
                        onClick={() => handleIncreaseQuantity(item)}
                      >
                        <AiOutlinePlus />
                      </Box>
                      <Box sx={styles.cartItemInfo}>{item.quantity}</Box>
                      <Box
                        sx={styles.quantityIcon}
                        onClick={() => handleDecreaseQuantity(item)}
                      >
                        <AiOutlineMinus />
                      </Box>
                    </Box>
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
