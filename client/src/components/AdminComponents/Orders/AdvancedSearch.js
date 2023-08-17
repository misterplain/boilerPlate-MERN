import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AlertMessage from "../../AlertMessage/AlertMessage";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { cancelOrder, editOrder } from "../../../actions/orderHistoryActions";
import { searchOrder } from "../../../actions/orderHistoryActions";
import { format } from "date-fns";
// import AdvancedSearch from "./AdvancedSearch";
import OrderSummary from "../../OrderSummary/OrderSummary";
import OrderSnapshot from "../../OrderSnapshot/OrderSnapshot";
import { snackbarDispatch } from "../../../utils/snackbarDispatch";
import { enqueueSnackbar } from "notistack";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
  formTest: {
    // border: "10px solid grey",
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
  querySelect: {
    display: "flex",
    justifyContent: "center",
    // margin: "1rem 0",
    border: "1px solid blue",
  },
  orderWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid grey",
    // margin: "0.5rem",
    // padding: "0.5rem",
  },
};

const AdvancedSearch = () => {
  const dispatch = useDispatch();
  const userDetailsState = useSelector((state) => state.userDetails);
  const orderHistoryState = useSelector((state) => state.orderHistory);
  const { orders, error, quickView } = orderHistoryState;
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;

  function formatDate(date) {
    return new Intl.DateTimeFormat().format(new Date(date));
  }

  function getOrderStatus(order) {
    if (order.isCancelled) {
      return "Cancelled";
    }
    if (!order.isShippedToCourier && !order.isCancelled) {
      return "In Production";
    }
    if (order.isShippedToCourier && order.isDelivered) {
      return "Delivered";
    }
    if (order.isShippedToCourier && !order.isDelivered) {
      return "Shipped To Courier";
    }
    return "Unknown";
  }

  const [time, setTime] = useState(quickView ? quickView : 30);

  const handleChange = (event) => {
    // setTime(event.target.value);
    // dispatch(filterPeriod(event.target.value, token));
  };

  return (
    <Box sx={styles.wrapper}>
      {" "}
      {error && <AlertMessage type="error">{error}</AlertMessage>}
      <Box sx={styles.querySelect}>
        <Formik
          initialValues={{
            emailAddress: "",
            orderStatus: "",
            shortId: "",
            postalCode: "",
            courierTrackingNumber: "",
          }}
          // validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            const filterQuery = {
              // collectionId: values.collectionId,
              // isDisplayed: values.isDisplayed === "true" ? true : false,
              // isFeatured: values.isFeatured === "true" ? true : false,
              // name: values.name,
              // price: values.price,
              // stock: values.stock,
              // description: values.description,
              // images: selectedFile,
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
            <form onSubmit={handleSubmit} style={styles.formTest}>
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
                {/* <FormLabel id="emailAddress">Email address</FormLabel> */}
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
                {/* <FormLabel id="shortId">Order Number</FormLabel> */}
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
                {/* <FormLabel id="postCode">Post Code</FormLabel> */}
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
                {/* <FormLabel id="courierTrackingNumber">
                  Tracking Number
                </FormLabel> */}
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
              <Button
                sx={styles.submitButton}
                variant="contained"
                type="submit"
              >
                <Typography variant="button">Search</Typography>
              </Button>
            </form>
          )}
        </Formik>
      </Box>{" "}
      <Box>
        {" "}
        {orders
          ?.sort((a, b) => new Date(b.datePlaced) - new Date(a.datePlaced))
          .map((order) => (
            <OrderSnapshot order={order} isAdmin={true} key={order._id} />
          ))}
      </Box>
    </Box>
  );
};

export default AdvancedSearch;
