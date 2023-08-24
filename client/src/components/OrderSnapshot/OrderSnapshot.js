import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { cancelOrder, editOrder } from "../../actions/orderHistoryActions";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Wrapper from "../Wrapper/Wrapper";

import styles from "./styles";

const OrderSnapshot = ({ order, isAdmin }) => {
  const dispatch = useDispatch();
  const userDetailsState = useSelector((state) => state.userDetails);
  const orderHistoryState = useSelector((state) => state.orderHistory);
  const { orders, error, quickView } = orderHistoryState;
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  return (
    <Box key={order._id}>
      {" "}
      <Wrapper
        id="orderWrapper"
        alignItems="center"
        justifyContent="space-between"
        customStyles={styles.orderWrapper}
      >
        {" "}
        <Wrapper id="orderSummary" flexDirection="column">
          <Link
            component={NavLink}
            to={
              isAdmin
                ? `/admin/orders/order-summary/${order._id}`
                : `order-summary/${order._id}`
            }
          >
            {" "}
            <Typography variant="h6" marginRight>
              Order #: {order.shortId}
            </Typography>
          </Link>{" "}
          <Typography variant="body1">Total: {order.totalPrice}</Typography>
          <Typography sx={{ display: "inline-flex" }}>
            Status:{" "}
            <Typography sx={styles.status(orderStatus)}>
              {" "}
              {orderStatus}
            </Typography>
          </Typography>{" "}
        </Wrapper>
        <Wrapper id="orderOptions">
          {" "}
          {!order.isShippedToCourier && !order.isCancelled && (
            <Button
              marginLeft
              color="error"
              variant="filledTonal"
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
                      // dateShipped: new Date(),
                      // courierTrackingNumber: "1234567890",
                    },
                  })
                )
              }
            >
              Mark as Delivered
            </Button>
          )}
        </Wrapper>
      </Wrapper>
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
    </Box>
  );
};

export default OrderSnapshot;
