import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { addAddress, deleteAddress } from "../../../actions/userActions";
import PageTitle from "../../PageTitle/PageTitle";
import Address from "../../Address/Address";

const styles = {
  wrapper: {},
};

const validationSchema = Yup.object({
  street: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  country: Yup.string().required("Country is required"),
  isDefault: Yup.string().required("Please select an option"),
});

const AccountAddress = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const userAuthState = useSelector((state) => state.userAuth);
  const userDetailsState = useSelector((state) => state.userDetails);
  const userDetails = userDetailsState?.userDetails;

  const token = userAuthState?.accessToken;

  return (
    <Box sx={styles.wrapper}>
      {userDetails?.addresses?.length === 0 && (
        <PageTitle
          title="No saved addresses, save one below"
          size="h6"
          lineBorder
        />
      )}
      {userDetails?.addresses.length > 0 && (
        <>
          <PageTitle title="Saved Addresses" size="h6" lineBorder />
        </>
      )}
      <Box sx={styles.existingAddresses}>
        {userDetails?.addresses?.map((address) => (
          <Box key={address._id} sx={{display: "flex", justifyContent: "space-between", margin: "10px"}}>
            {/* <Typography variant="body1">{address.street}</Typography>
            <Typography variant="body1">{address.city}</Typography>
            <Typography variant="body1">{address.postalCode}</Typography>
            <Typography variant="body1">{address.country}</Typography>
            <Typography variant="body1">
              {address.isDefault ? "Default" : ""}
            </Typography> */}
            <Address address={address} />
            <Button
              variant="contained"
              color="error"
              sx={{ width: "auto", alignSelf: "center" }}
              onClick={() => {
                dispatch(deleteAddress(token, address._id));
              }}
            >
              Delete
            </Button>
          </Box>
        ))}
      </Box>
      <Box sx={styles.newAddress}>
      <PageTitle title="Add a new address" size="h6" lineBorder />
        <Formik
          initialValues={{
            street: "",
            city: "",
            postalCode: "",
            country: "",
            isDefault: "false",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            const addressData = {
              isDefault: values.isDefault === "true" ? true : false,
              street: values.street,
              city: values.city,
              postalCode: values.postalCode,
              country: values.country,
            };

            dispatch(addAddress(token, addressData));
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
              <FormControl sx={{ width: "100%" }}>
                <FormLabel id="isDefault">Set as default address</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="isDefault"
                  name="isDefault"
                  value={values.isDefault}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                </RadioGroup>
              </FormControl>
              <hr></hr>
              <Button type="submit">Add Address</Button>{" "}
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default AccountAddress;
