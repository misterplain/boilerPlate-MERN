import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { NavLink } from "react-router-dom";
import { Link, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { setEmailAddress } from "../../../actions/userOrderActions";
import Wrapper from "../../Wrapper/Wrapper";

const CheckoutUser = ({ proceedToNextStep }) => {
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const userDetailsState = useSelector((state) => state.userDetails);
  const userDetails = userDetailsState?.userDetails;
  const userEmail = userDetails?.email;
  const productState = useSelector((state) => state.productList);
  const { products } = productState;
  const orderState = useSelector((state) => state.userOrder);
  const {
    cartItems,
    isGuest,
    isPaid,
    shippingAddress,
    totalPrice,
    emailAddress,
  } = orderState;

  const token = userAuthState?.accessToken;
  const { authenticated } = userAuthState;

  useEffect(() => {
    if (authenticated && !emailAddress) {
      dispatch(setEmailAddress(userEmail));
    }
  }, [authenticated, dispatch, userEmail, emailAddress]);

  useEffect(() => {
    if (authenticated && emailAddress) {
      proceedToNextStep();
    }
  }, [authenticated, emailAddress, proceedToNextStep]);

  const validationSchema = Yup.object({
    email: Yup.string().required("Address is required"),
    confirmEmail: Yup.string().oneOf(
      [Yup.ref("email"), null],
      "Email addresses must match"
    ),
  });


  return (
    <Wrapper gridContainer customStyles={{
      justifyContent: "center",
    }}>
      <Grid
        item
        xs={10}
        sm={8}
        md={7}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "1px solid grey"
        }}
      >
        <Link component={NavLink} to="/auth">
          <Button>Log in</Button>
        </Link>
        <Typography>/</Typography>
        <Link component={NavLink} to="/register">
          <Button>Sign up</Button>
        </Link>
      </Grid>

      <Grid
        item
        xs={10}
        sm={8}
        md={7}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "15px 0px"
        }}
      >
        <Typography variant="h6" marginBottom>
          Or checkout as guest with email adress
        </Typography>
        <Box >
          {" "}
          <Formik
            initialValues={{
              email: emailAddress ? emailAddress : "",
              confirmEmail: emailAddress ? emailAddress : "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              dispatch(setEmailAddress(values.email));
              proceedToNextStep();
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
                style={{ display: "flex", flexDirection: "column" }}
              >
                <FormControl >
                  <FormLabel id="email">Email Address</FormLabel>
                  <FormGroup>
                    <TextField
                      name="email"
                      variant="filled"
                      color="success"
                      value={values.email}
                      onChange={handleChange}
                      helperText={errors.email}
                    />
                  </FormGroup>
                </FormControl>
                <hr></hr>
                <FormControl>
                  <FormLabel id="confirmEmail">Confirm Email Address</FormLabel>
                  <FormGroup>
                    <TextField
                      name="confirmEmail"
                      variant="filled"
                      color="success"
                      value={values.confirmEmail}
                      onChange={handleChange}
                      helperText={errors.confirmEmail}
                    />
                  </FormGroup>
                </FormControl>
                <hr></hr>
                <Button type="submit">Continue</Button>{" "}
              </form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Wrapper>
  );
};

export default CheckoutUser;
