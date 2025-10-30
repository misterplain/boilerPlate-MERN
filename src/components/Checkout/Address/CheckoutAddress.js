import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { setShippingAddress } from "../../../actions/userOrderActions";
import Wrapper from "../../Wrapper/Wrapper";
import ResponsiveWrapper from "../../Wrapper/ResponsiveWrapper";
import Grid from "@mui/material/Grid";

const validationSchema = Yup.object({
  street: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  country: Yup.string().required("Country is required"),
});

const CheckoutAddress = ({ proceedToNextStep }) => {
  const dispatch = useDispatch();
  const userAuthState = useSelector((state) => state.userAuth);
  const userDetailsState = useSelector((state) => state.userDetails);
  const userDetails = userDetailsState?.userDetails;
  const orderState = useSelector((state) => state.userOrder);
  const { shippingAddress } = orderState;

  const token = userAuthState?.accessToken;
  const { authenticated } = userAuthState;

  return (
    <ResponsiveWrapper>
      <Grid container sx={{marginTop: "20px"}}>
        <Grid item xs={12} sm={5} >
          {" "}
          {authenticated &&
            userDetails &&
            userDetails?.addresses?.length >= 1 && (
              <Wrapper
                id="existingAddresses"
                flexDirection="column"
                alignItems="center"
              >
                <Typography>Use an existing address</Typography>{" "}
                {userDetails?.addresses?.map((address) => (
                  <Box
                    key={address._id}
                    sx={{
                      border: "1px solid grey",
                      padding: "10px",
                      borderRadius: "10px",
                      margin: "10px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="body1">{address.street}</Typography>
                    <Typography variant="body1">{address.city}</Typography>
                    <Typography variant="body1">
                      {address.postalCode}
                    </Typography>
                    <Typography variant="body1">{address.country}</Typography>
                    <Typography variant="body1">
                      {address.isDefault ? "Default" : ""}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="success"
                      sx={{ marginTop: "10px", alignSelf: "center" }}
                      onClick={() => {
                        const shippingAddress = {
                          street: address.street,
                          city: address.city,
                          postalCode: address.postalCode,
                          country: address.country,
                        };
                        dispatch(setShippingAddress(shippingAddress));
                        proceedToNextStep();
                      }}
                    >
                      Use
                    </Button>
                  </Box>
                ))}
              </Wrapper>
            )}
        </Grid>
        <Grid item xs={12} md={7}>
          {" "}
          <Wrapper id="newAddress">
            {" "}
            <Formik
              initialValues={{
                street: shippingAddress?.street ? shippingAddress?.street : "",
                city: shippingAddress?.city ? shippingAddress?.city : "",
                postalCode: shippingAddress?.postalCode
                  ? shippingAddress?.postalCode
                  : "",
                country: shippingAddress?.country
                  ? shippingAddress?.country
                  : "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                const addressData = {
                  street: values.street,
                  city: values.city,
                  postalCode: values.postalCode,
                  country: values.country,
                };

                dispatch(setShippingAddress(addressData));
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
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <FormControl fullWidth>
                    <FormLabel id="street">Address</FormLabel>
                    <FormGroup sx={{ margin: "1rem 0rem" }}>
                      <TextField
                        name="street"
                        variant="outlined"
                        color="success"
                        value={values.street}
                        onChange={handleChange}
                        helperText={errors.street}
                      />
                    </FormGroup>
                  </FormControl>
                  <FormControl fullWidth>
                    <FormLabel id="city">Town/City</FormLabel>
                    <FormGroup sx={{ margin: "1rem 0rem" }}>
                      <TextField
                        name="city"
                        variant="outlined"
                        color="success"
                        value={values.city}
                        onChange={handleChange}
                        helperText={errors.city}
                      />
                    </FormGroup>
                  </FormControl>
                  <FormControl fullWidth>
                    <FormLabel id="postalCode">Postal Code</FormLabel>
                    <FormGroup sx={{ margin: "1rem 0rem" }}>
                      <TextField
                        name="postalCode"
                        variant="outlined"
                        color="success"
                        value={values.postalCode}
                        onChange={handleChange}
                        helperText={errors.postalCode}
                      />
                    </FormGroup>
                  </FormControl>
                  <FormControl fullWidth>
                    <FormLabel id="country">Country</FormLabel>
                    <FormGroup sx={{ margin: "1rem 0rem" }}>
                      <TextField
                        name="country"
                        variant="outlined"
                        color="success"
                        value={values.country}
                        onChange={handleChange}
                        helperText={errors.country}
                      />
                    </FormGroup>
                  </FormControl>
                  <Button type="submit">Set Shipping Address</Button>{" "}
                </form>
              )}
            </Formik>
          </Wrapper>
        </Grid>
      </Grid>
    </ResponsiveWrapper>
  );
};

export default CheckoutAddress;
