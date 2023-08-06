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

const styles = {
  wrapper: {
    border: "1px solid black",
  },
};

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
    <Box sx={styles.wrapper}>
      {authenticated && (
        <Box sx={styles.userAddresses}>
          <Typography>Use an existing address</Typography>
          <Box>
            {" "}
            {userDetails?.addresses?.map((address) => (
              <Box key={address._id}>
                <Typography variant="body1">{address.street}</Typography>
                <Typography variant="body1">{address.city}</Typography>
                <Typography variant="body1">{address.postalCode}</Typography>
                <Typography variant="body1">{address.country}</Typography>
                <Typography variant="body1">
                  {address.isDefault ? "Default" : ""}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
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
          </Box>
        </Box>
      )}

      <Box sx={styles.newAddress}>
        {" "}
        <Formik
          initialValues={{
            street: shippingAddress?.street ? shippingAddress?.street : "",
            city: shippingAddress?.city ? shippingAddress?.city : "",
            postalCode: shippingAddress?.postalCode
              ? shippingAddress?.postalCode
              : "",
            country: shippingAddress?.country ? shippingAddress?.country : "",
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
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel id="street">Address</FormLabel>
                <FormGroup>
                  <TextField
                    name="street"
                    variant="filled"
                    color="success"
                    value={values.street}
                    onChange={handleChange}
                    helperText={errors.street}
                  />
                </FormGroup>
              </FormControl>
              <hr></hr>
              <FormControl>
                <FormLabel id="city">Town/City</FormLabel>
                <FormGroup>
                  <TextField
                    name="city"
                    variant="filled"
                    color="success"
                    value={values.city}
                    onChange={handleChange}
                    helperText={errors.city}
                  />
                </FormGroup>
              </FormControl>
              <hr></hr>
              <FormControl>
                <FormLabel id="postalCode">Postal Code</FormLabel>
                <FormGroup>
                  <TextField
                    name="postalCode"
                    variant="filled"
                    color="success"
                    value={values.postalCode}
                    onChange={handleChange}
                    helperText={errors.postalCode}
                  />
                </FormGroup>
              </FormControl>
              <hr></hr>
              <FormControl>
                <FormLabel id="country">Country</FormLabel>
                <FormGroup>
                  <TextField
                    name="country"
                    variant="filled"
                    color="success"
                    value={values.country}
                    onChange={handleChange}
                    helperText={errors.country}
                  />
                </FormGroup>
              </FormControl>
              <hr></hr>
              <Button type="submit">Set Shipping Address</Button>{" "}
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default CheckoutAddress;
