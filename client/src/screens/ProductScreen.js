import React from "react";
import Box from "@mui/material/Box";
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
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  getCartItems,
  addCartItemUser,
  addCartItemGuest,
  removeCartItemUser,
  removeCartItemGuest,
} from "../actions/cartActions";

const ProductScreen = () => {
  const location = useLocation();
  const { productId } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const userAuthState = useSelector((state) => state.userAuth);
  const { authenticated } = userAuthState;
  const userDetailsState = useSelector((state) => state.userDetails);
  const { email, username, isAdmin } = userDetailsState?.userDetails || {};
  const cartState = useSelector((state) => state.shoppingCart);
  const { cartItems, loading, error } = cartState || {};
  const token = userAuthState?.accessToken;

  const { isOpen, setIsOpen } = useCartDrawer();

  const displayedProduct = productList.products.find(
    (product) => product._id === productId
  );

  const productInBasket = cartItems?.find(
    (item) => item.product === displayedProduct._id
  );

  const validationSchema = Yup.object({
    quantity: Yup.number().required("Required"),
  });

  const styles = {
    wrapper: {
      border: "1px solid black",
      display: "flex",
      flexDirection: "column",
    },
  };

  return (
    <Grid container sx={{ display: "flex", justifyContent: "center" }}>
      <Grid item xs={10} sm={4}>
        <Box
          component="img"
          src={
            displayedProduct?.photos?.length > 1
              ? displayedProduct?.photos[0]
              : "https://placehold.co/400x500"
          }
          sx={{ width: "100%", height: "auto" }}
        ></Box>
      </Grid>
      <Grid item xs={10} sm={6}>
        {displayedProduct && (
          <>
            {" "}
            <Typography variant="h2">{displayedProduct?.name}</Typography>
            <Typography variant="h4">
              {displayedProduct?.description}
            </Typography>
            <Typography variant="h5">
              {displayedProduct?.stock} in stock
            </Typography>
            <Typography variant="h5">${displayedProduct?.price}</Typography>
            <Formik
              initialValues={{
                quantity: 1,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                if (authenticated) {
                  if (!productInBasket) {
                    dispatch(
                      addCartItemUser({
                        token,
                        productId,
                        quantity: values.quantity,
                      })
                    );
                  } else {
                    console.log(productInBasket);
                    dispatch(
                      removeCartItemUser({
                        token,
                        productId,
                        quantity: productInBasket.quantity,
                      })
                    );
                  }
                } else {
                  if (!productInBasket) {
                    dispatch(addCartItemGuest(productId, values.quantity));
                  } else {
                    dispatch(
                      removeCartItemGuest(productId, productInBasket.quantity)
                    );
                  }
                }

                resetForm();
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
                <form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormLabel id="quantity">Quantity</FormLabel>
                    <FormGroup>
                      <TextField
                        name="quantity"
                        variant="filled"
                        color="success"
                        type="number"
                        value={values.quantity}
                        onChange={handleChange}
                        helperText={errors.quantity}
                        InputProps={{ inputProps: { min: 1 } }}
                      />
                    </FormGroup>
                  </FormControl>
                  {!productInBasket ? (
                    <Button type="submit">Add to Basket</Button>
                  ) : (
                    <Button type="submit">Remove from Basket</Button>
                  )}
                </form>
              )}
            </Formik>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default ProductScreen;
