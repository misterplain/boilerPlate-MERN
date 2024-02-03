import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useLocation } from "react-router";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCartDrawer } from "../context/CartDrawerContext";
import { Formik } from "formik";
import * as Yup from "yup";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  addCartItemUser,
  addCartItemGuest,
  removeCartItemUser,
  removeCartItemGuest,
} from "../actions/cartActions";
import { fetchReviews, clearReviews } from "../actions/reviewsActions";
import { fetchAllProducts } from "../actions/productActions";
import { fetchAllCollections } from "../actions/collectionsActions";
import ProductCarousel from "../components/ProductCarousel/ProductCarousel";
import ProductReviews from "../components/ProductReviews/ProductReviews";
import { useSnackbar } from "notistack";
import Wrapper from "../components/Wrapper/Wrapper";
import { updateFavorites } from "../actions/userActions";
import Box from "@mui/material/Box";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import FavoritesButton from "../components/FavoritesButton/FavoritesButton";

const ProductScreen = () => {
  const location = useLocation();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const productList = useSelector((state) => state.productList);
  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { isGuest } = userDetailsState;
  const { email, username, isAdmin } = userDetailsState?.userDetails || {};
  const cartState = useSelector((state) => state.shoppingCart);
  const { cartItems, loading, error } = cartState || {};
  const token = userAuthState?.accessToken;
  const reviewsState = useSelector((state) => state.reviews);
  const { reviews } = reviewsState || {};
  const { favorites = [] } = userDetailsState?.userDetails || [];

  const { isOpen, setIsOpen } = useCartDrawer();

  const displayedProduct = productList?.products?.find(
    (product) => product._id === productId
  );

  const productInBasket = cartItems?.find(
    (item) => item?.product === displayedProduct?._id
  );

  const validationSchema = Yup.object({
    quantity: Yup.number().required("Required"),
  });

  useEffect(() => {
    if (productList?.products?.length === 0) {
      dispatch(fetchAllProducts());
      dispatch(fetchAllCollections());
    }
    if (!displayedProduct || !displayedProduct._id) return;

    if (
      reviews &&
      reviews?.length >= 1 &&
      displayedProduct._id !== reviews[0]?.productId
    ) {
      dispatch(clearReviews());
    }

    dispatch(fetchReviews(token, displayedProduct._id));
  }, [dispatch, token, displayedProduct]);

  console.log(isGuest);

  const changeFavorites = async (productId, method) => {};

  return (
    <Wrapper
      gridContainer
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      customStyles={{
        margin: "20px 0px",
      }}
    >
      {" "}
      <Grid item xs={8} sm={6}>
        <ProductCarousel product={displayedProduct} />
      </Grid>
      <Grid item xs={10} sm={4}>
        {displayedProduct && (
          <Wrapper flexDirection="column" width="100%" alignItems="flex-start">
            {" "}
            <Typography variant="h3">{displayedProduct?.name}</Typography>
            <Typography variant="h5">
              {displayedProduct?.description}
            </Typography>
            <Typography variant="h6">
              {displayedProduct?.stock} in stock
            </Typography>
            <Typography variant="h6">${displayedProduct?.price}</Typography>
            <FavoritesButton
              authenticated={authenticated}
              favorites={favorites}
              displayedProduct={displayedProduct}
              isGuest={isGuest}
              token={token}
              dispatch={dispatch}
            />
            <Formik
              initialValues={{
                quantity: 1,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  if (authenticated) {
                    if (!productInBasket) {
                      await dispatch(
                        addCartItemUser({
                          token,
                          productId,
                          quantity: values.quantity,
                          price: displayedProduct.price,
                          name: displayedProduct.name,
                        })
                      );
                      enqueueSnackbar(
                        `${values.quantity} x ${displayedProduct.name} added to cart`,
                        { variant: "success" }
                      );
                    } else {
                      await dispatch(
                        removeCartItemUser({
                          token,
                          productId,
                          quantity: productInBasket.quantity,
                          price: displayedProduct.price,
                          name: displayedProduct.name,
                        })
                      );
                      enqueueSnackbar("Item removed from cart!", {
                        variant: "info",
                      });
                    }
                  } else {
                    if (!productInBasket) {
                      await dispatch(
                        addCartItemGuest({
                          productId,
                          quantity: values.quantity,
                          pricePerUnit: displayedProduct.price,
                          name: displayedProduct.name,
                        })
                      );
                      enqueueSnackbar(
                        `${values.quantity} x ${displayedProduct.name} added to cart`,
                        { variant: "success" }
                      );
                    } else {
                      await dispatch(
                        removeCartItemGuest({
                          productId,
                          quantity: productInBasket.quantity,
                          pricePerUnit: displayedProduct.price,
                          name: displayedProduct.name,
                        })
                      );
                      enqueueSnackbar("Item removed from cart!", {
                        variant: "info",
                      });
                    }
                  }
                } catch (error) {
                  enqueueSnackbar(`An error occurred: ${error.message}`, {
                    variant: "error",
                  });
                } finally {
                  resetForm();
                }
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlue,
                values,
                isValid,
                errors,
                touched,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "20px 0px",
                  }}
                >
                  {!productInBasket && (
                    <FormControl>
                      <FormLabel id="quantity">Quantity</FormLabel>
                      <FormGroup>
                        <TextField
                          name="quantity"
                          variant="outlined"
                          color="success"
                          type="number"
                          value={values.quantity}
                          onChange={handleChange}
                          helperText={errors.quantity}
                          InputProps={{ inputProps: { min: 1 } }}
                          sx={{ marginTop: "10px" }}
                        />
                      </FormGroup>
                    </FormControl>
                  )}

                  {!productInBasket ? (
                    <Button
                      type="submit"
                      disabled={values.quantity > displayedProduct.stock}
                      variant="outlined"
                      color="success"
                      size="small"
                      fullWidth
                      marginTop="10px"
                    >
                      Add to Basket
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="outlined"
                      color="success"
                      size="small"
                      fullWidth
                      marginTop="10px"
                    >
                      Remove from Basket
                    </Button>
                  )}
                </form>
              )}
            </Formik>
            {/* {authenticated &&
                  favorites &&
                  favorites?.includes(displayedProduct._id) ? (
                    <Button
                      sx={{ marginTop: "10px" }}
                      color="danger"
                      variant="outlined"
                      onClick={async () => {
                        await dispatch(
                          updateFavorites({
                            token: token,
                            method: "REMOVE",
                            productId: displayedProduct._id,
                          })
                        );
                      }}
                    >
                      Remove from favorites
                    </Button>
                  ) : (
                    <Button
                      sx={{ marginTop: "10px" }}
                      color="success"
                      variant="outlined"
                      onClick={async () => {
                        await dispatch(
                          updateFavorites({
                            token: token,
                            method: "ADD",
                            productId: displayedProduct._id,
                          })
                        );
                      }}
                    >
                      Add to favorites
                    </Button>
                  )} */}
          </Wrapper>
        )}
      </Grid>
      <Grid item xs={10} sm={10}>
        {displayedProduct && (
          <ProductReviews productId={displayedProduct._id} />
        )}
      </Grid>
    </Wrapper>
  );
};

export default ProductScreen;
