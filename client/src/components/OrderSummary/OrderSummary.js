import React from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder, editOrder } from "../../actions/orderHistoryActions";
import { Route, Routes, Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import Wrapper from "../Wrapper/Wrapper";
import PageTitle from "../PageTitle/PageTitle";
import Address from "../Address/Address";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import styles from "./styles";

const OrderSummary = () => {
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const userDetailsState = useSelector((state) => state.userDetails);
  const { isGuest, userDetails, orderHistory } = userDetailsState;
  const { isAdmin } = userDetails;
  const adminOrdersState = useSelector((state) => state.adminOrders);
  const orderHistoryState = useSelector((state) => state.orderHistory);
  const { orders, error } = orderHistoryState;
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;

  const order = orders.find((o) => o._id === orderId);

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

  const orderStatus = getOrderStatus(order);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const timeOptions = { hour: "numeric", minute: "numeric" };
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
    const suffix = getSuffix(date.getDate());
    return `${formattedDate}${suffix}, ${date.getFullYear()} at ${formattedTime}`;
  }

  function getSuffix(day) {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  //cancellation modal
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Wrapper
      id="pageWrapper"
      flexDirection="column"
      // alignItems="center"
      justifyContent="center"
      width="100%"
      customStyles={{
        // border: "1px solid blue",
        padding: "10px",
      }}
    >
      <PageTitle
        title={`Order Number: ${order.shortId}`}
        size="h4"
        lineBorder
        color="purple"
      />
      <Wrapper justifyContent="center" customStyles={{ margin: "20px 0px" }}>
        {" "}
        <PageTitle
          title="Shipping Address and Contact Email"
          size="h6"
          lineBorder
          color="black"
        />
        <Address address={order.shippingAddress} email={order.emailAddress} />
      </Wrapper>

      <Wrapper
        flexDirection="column"
        width="100%"
        justifyContent="center"
        customStyles={{
          margin: "5px 0px",
          padding: "10px",
          border: "1px solid grey",
          borderRadius: "10px",
        }}
      >
        {" "}
        <PageTitle title="Items Ordered" size="h6" lineBorder color="black" />
        {order?.orderedItems.map((item) => (
          <Wrapper
            id="entireItem"
            justifyContent="space-between"
            key={item._id}
            width="auto"
          >
            <Wrapper id="itemInfo" width="auto">
              {" "}
              <Typography variant="body1">{item.quantity} x&nbsp;</Typography>
              <Link component={NavLink} to={`/product/${item.product}`}>
                <Typography variant="body1">{item.name}</Typography>
              </Link>
              <Typography variant="body1">
                &nbsp;at&nbsp;${item.price} each
              </Typography>
            </Wrapper>
            <Wrapper id="itemPrice" width="auto">
              <Typography variant="body1">
                $&nbsp;{item.quantity * item.price}
              </Typography>
            </Wrapper>
          </Wrapper>
        ))}
        <Wrapper
          id="orderTotal"
          flexDirection="column"
          alignItems="flex-end"
          customStyles={{ margin: "15px 0px 0px 0px" }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Shipping: $0
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Total: $&nbsp;{order.totalPrice}
          </Typography>
        </Wrapper>
      </Wrapper>

      <Wrapper id="orderStatus" flexDirection="column">
        {" "}
        <PageTitle title={`Order Status`} lineBorder />
        <Typography sx={{ display: "inline-flex" }}>
          Status:{" "}
          <Typography sx={styles.status(orderStatus)}>
            {" "}
            {orderStatus}
          </Typography>
        </Typography>{" "}
        <Typography sx={{ display: "inline-flex" }}>
          Order Placed:
          <Typography>&nbsp;{formatDate(order.datePlaced)}</Typography>
        </Typography>
        {orderStatus === "Shipped To Courier" ||
          (orderStatus === "Delivered" && (
            <>
              {" "}
              <Typography sx={{ display: "inline-flex" }}>
                Date Shipped to Courier:
                <Typography>&nbsp;{formatDate(order.dateShipped)}</Typography>
              </Typography>
              <Typography sx={{ display: "inline-flex" }}>
                Tracking Number:
                <Typography>&nbsp;{order.courierTrackingNumber}</Typography>
              </Typography>
            </>
          ))}
        {orderStatus === "Delivered" && (
          <Typography sx={{ display: "inline-flex" }}>
            Date Delivered:
            <Typography>&nbsp;{formatDate(order.dateDelivered)}</Typography>
          </Typography>
        )}
        <Wrapper
          id="optionsWrapper"
          customStyles={{ margin: "15px 0px" }}
          justifyContent="space-around"
        >
          {" "}
          {!order.isShippedToCourier && !order.isCancelled && (
            <Button
              marginTop
              color="error"
              variant="contained"
              onClick={handleClickOpen}
            >
              Cancel
            </Button>
          )}
          {isAdmin && !order.isShippedToCourier && !order.isCancelled && (
            <Button
              onClick={() =>
                dispatch(
                  editOrder({
                    token,
                    orderId: order._id,
                    requestData: {
                      type: "shippedToCourier",
                      isShippedToCourier: true,
                      dateShipped: new Date(),
                      courierTrackingNumber: "1234567890",
                    },
                  })
                )
              }
              variant="contained"
              color="success"
            >
              Mark as Shipped
            </Button>
          )}
          {isAdmin && order.isShippedToCourier && !order.isDelivered && (
            <Button
              onClick={() =>
                dispatch(
                  editOrder({
                    token,
                    orderId: order._id,
                    requestData: {
                      type: "isDelivered",
                      isDelivered: true,
                    },
                  })
                )
              }
              variant="contained"
              color="secondary"
            >
              Mark as Delivered
            </Button>
          )}
        </Wrapper>
      </Wrapper>

      {/* CANCELLATION MDOAL */}
      <Box sx={styles.cancelAlert}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="cancel-title"
          aria-describedby="cancel-description"
        >
          <DialogTitle id="cancel-title">
            {"Are you sure you want to cancel?"}
          </DialogTitle>
          <DialogContent>
            {isAdmin ? (
              <DialogContentText id="alert-dialog-description">
                This user will receive a confirmation email advising them to
                refuse the delivery if the order is shipped before the
                cancellation is complete.
              </DialogContentText>
            ) : (
              <DialogContentText id="alert-dialog-description">
                If your order is shipped to the courier before the cancellation
                is complete, you may refuse the delivery for a full refund
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button
              onClick={() => {
                dispatch(cancelOrder(token, order._id));
                handleClose();
              }}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Wrapper>
  );
};

export default OrderSummary;
