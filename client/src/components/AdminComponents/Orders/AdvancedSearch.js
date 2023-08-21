import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AlertMessage from "../../AlertMessage/AlertMessage";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { searchOrder } from "../../../actions/orderHistoryActions";
import OrderSnapshot from "../../OrderSnapshot/OrderSnapshot";
import { snackbarDispatch } from "../../../utils/snackbarDispatch";
import { enqueueSnackbar } from "notistack";
import Wrapper from "../../Wrapper/Wrapper";

const styles = {
  formWrapper: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },
  formControl: {
    width: "45%",
    margin: "5px",
  },
  submitButton: {
    width: "45%",
    border: "1px solid purple",
  },
};

const AdvancedSearch = () => {
  const dispatch = useDispatch();
  const orderHistoryState = useSelector((state) => state.orderHistory);
  const { orders, error } = orderHistoryState;
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;


  return (
    <Wrapper id="pageWrapper" flexDirection="column">
      {error && <AlertMessage type="error">{error}</AlertMessage>}
      <Formik
        initialValues={{
          emailAddress: "",
          orderStatus: "",
          shortId: "",
          postalCode: "",
          courierTrackingNumber: "",
        }}
        onSubmit={async (values, { resetForm }) => {
          const filterQuery = {
            emailAddress: values.emailAddress,
            orderStatus: values.orderStatus,
            shortId: values.shortId,
            postalCode: values.postCode,
            courierTrackingNumber: values.courierTrackingNumber,
          };

          console.log(filterQuery);

          snackbarDispatch(
            dispatch(searchOrder(filterQuery, token)),
            "Search successful",
            "No orders found",
            enqueueSnackbar,
            []
          );
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
          <form onSubmit={handleSubmit} style={styles.formWrapper}>
            <FormControl sx={styles.formControl}>
              <InputLabel id="orderStatus">Order Status</InputLabel>
              <Select
                labelId="orderStatus"
                id="orderStatus"
                name="orderStatus"
                value={values.orderStatus}
                label="Order Status"
                onChange={handleChange}
              >
                <MenuItem value={"All"}>All Orders</MenuItem>
                <MenuItem value={"In Production"}>In Production</MenuItem>
                <MenuItem value={"Shipped To Courier"}>
                  Shipped To Courier
                </MenuItem>
                <MenuItem value={"Delivered"}>Delivered</MenuItem>
                <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={styles.formControl}>
              <FormGroup>
                <TextField
                  name="emailAddress"
                  variant="outlined"
                  color="success"
                  value={values.emailAddress}
                  onChange={handleChange}
                  label="Email Address"
                />
              </FormGroup>
            </FormControl>
            <FormControl sx={styles.formControl}>
              <FormGroup>
                <TextField
                  name="shortId"
                  variant="outlined"
                  color="success"
                  value={values.shortId}
                  onChange={handleChange}
                  label="Order Number"
                />
              </FormGroup>
            </FormControl>
            <FormControl sx={styles.formControl}>
              <FormGroup>
                <TextField
                  name="postalCode"
                  variant="outlined"
                  color="success"
                  type="text"
                  value={values.postalCode}
                  onChange={handleChange}
                  label="Post Code"
                />
              </FormGroup>
            </FormControl>
            <FormControl sx={styles.formControl}>
              <FormGroup>
                <TextField
                  name="courierTrackingNumber"
                  variant="outlined"
                  color="success"
                  value={values.courierTrackingNumber}
                  onChange={handleChange}
                  label="Courier Tracking Number"
                />
              </FormGroup>
            </FormControl>
            <Button sx={styles.submitButton} variant="contained" type="submit">
              <Typography variant="button">Search</Typography>
            </Button>
          </form>
        )}
      </Formik>

      <Wrapper id="ordersWrapper" flexDirection="column">
        {" "}
        {orders
          ?.sort((a, b) => new Date(b.datePlaced) - new Date(a.datePlaced))
          .map((order) => (
            <OrderSnapshot order={order} isAdmin={true} key={order._id} />
          ))}
      </Wrapper>
    </Wrapper>
  );
};

export default AdvancedSearch;
