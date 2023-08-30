import React from "react";
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
import { useSnackbar } from "notistack";
import Wrapper from "../Wrapper/Wrapper";

import styles from "./styles";

const CartItems = () => {
  const dispatch = useDispatch();
  const cartDrawerContext = useCartDrawer();
  const { enqueueSnackbar } = useSnackbar();

  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const { products } = useSelector((state) => state.productList);
  const cartState = useSelector((state) => state.shoppingCart);
  const { cartItems } = cartState;
  const token = userAuthState?.accessToken;

  const detailedCartItems = cartItems?.map((item) => {
    const productDetails = products?.find((p) => p._id === item.product);
    return { ...item, product: productDetails, name: productDetails?.name };
  });

  const cartItemTotal = (item) => {
    return item.product.price * item.quantity;
  };

  const handleIncreaseQuantity = (item) => {
    if (Number(item.quantity) + 1 > Number(item.product.stock)) {
      enqueueSnackbar(
        `There are only ${item.product.stock} of this item in stock`,
        { variant: "error" }
      );
    } else {
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
        enqueueSnackbar(`1 x ${item.product.name} added to cart`, {
          variant: "success",
        });
      } else {
        dispatch(
          addCartItemGuest({
            productId: item.product._id,
            quantity: 1,
            pricePerUnit: item.product.price,
            name: item.product.name,
          })
        );
        enqueueSnackbar(`1 x ${item.product.name} added to cart`, {
          variant: "success",
        });
      }
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
      enqueueSnackbar(`1 x ${item.product.name} removed from cart`, {
        variant: "info",
      });
    } else {
      dispatch(
        removeCartItemGuest({
          productId: item.product._id,
          quantity: 1,
          pricePerUnit: item.product.price,
          name: item.product.name,
        })
      );
      enqueueSnackbar(`1 x ${item.product.name} removed from cart`, {
        variant: "info",
      });
    }
  };

  const handleDeleteItem = (item) => {
    if (authenticated) {
      dispatch(
        removeCartItemUser({
          productId: item.product._id,
          quantity: item.quantity,
          token,
          price: item.product.price,
          name: item.product.name,
        })
      );
      enqueueSnackbar(`Item removed from cart`, {
        variant: "info",
      });
    } else {
      dispatch(
        removeCartItemGuest({
          productId: item.product._id,
          quantity: item.quantity,
          pricePerUnit: item.product.price,
          name: item.product.name,
        })
      );
      enqueueSnackbar(`Item removed from cart`, {
        variant: "info",
      });
    }
  };

  return (
    <Wrapper
      id="componentWrapper"
      flexDirection="row"
      width="100%"
      justifyContent="center"
      customStyles={{
        padding: "15px 0px",
      }}
    >
      <Wrapper id="cartTitle" justifyContent="center">
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {cartItems?.length === 0 ? "Your cart is empty" : "Your cart"}
        </Typography>
      </Wrapper>

      {cartItems?.length > 0 && (
        <Wrapper
          id="cartItems"
          justifyContent="column"
        >
          {detailedCartItems &&
            detailedCartItems?.map((item) => {
              if (!item.product) {
                return null;
              }
              return (
                <Wrapper id="cartItem" key={item.product._id}>
                  <Wrapper
                    id="imageTitleDeleteWrapper"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Link
                      component={NavLink}
                      to={`/product/${item.product._id}`}
                      onClick={() => {
                        cartDrawerContext.setIsOpen(false);
                      }}
                    >
                      {/* <Box sx={styles.imageTitle}> */}
                      <Wrapper alignItems="center">
                        {" "}
                        <Box
                          sx={styles.image}
                          component="img"
                          src={
                            item.product.images.length >= 1
                              ? item.product.images[0].url
                              : "https://placehold.co/80x80"
                          }
                        />
                        <Typography marginLeft>{item.product.name}</Typography>
                      </Wrapper>

                      {/* </Box>{" "} */}
                    </Link>
                    <Box
                      onClick={() => {
                        handleDeleteItem(item);
                      }}
                    >
                      <DeleteOutlineIcon />
                    </Box>
                  </Wrapper>
                  <Wrapper
                    id="optionsWrapper"
                    justifyContent="space-between"
                    customStyles={{
                      margin: "10px",
                      borderBottom: "1px solid grey",
                      padding: "10px",
                    }}
                  >
                    {" "}
                    <Box sx={styles.cartItemInfoWrapper}>
                      <Typography>Price-{" "}</Typography>
                      <Typography>${cartItemTotal(item)}</Typography>
                    </Box>
                    <Box sx={styles.cartItemInfoWrapper}>
                        <Box
                          sx={styles.quantityIcon}
                          onClick={() => handleIncreaseQuantity(item)}
                        >
                          <AiOutlinePlus />
                        </Box>
                        <Typography variant="body1">{item.quantity}</Typography>
                        <Box
                          sx={styles.quantityIcon}
                          onClick={() => handleDecreaseQuantity(item)}
                        >
                          <AiOutlineMinus />
                        </Box>
                    </Box>
                  </Wrapper>
                </Wrapper>
              );
            })}
        </Wrapper>
      )}
    </Wrapper>
  );
};

export default CartItems;
