import React, { useState, useEffect } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import {
  fetchAllOrders,
  cancelOrder,
  editOrder,
} from "../../../actions/orderActions";
import { format } from "date-fns";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
};

const AdminOrders = () => {
  const dispatch = useDispatch();
  const userDetailsState = useSelector((state) => state.userDetails);
  const { isGuest, userDetails, orderHistory } = userDetailsState;
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;

  //in production
  //shipped to the courier
  //delivered

  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    dispatch(fetchAllOrders(token));
  }, []);

  function formatDate(date) {
    return new Intl.DateTimeFormat().format(new Date(date));
  }

  console.log(orderHistory);

  function getOrderStatus(order) {
    if (order.isCancelled) {
      return "Cancelled";
    }
    if (!order.isShippedToCourier) {
      return "Awaiting Shipment";
    }
    if (order.isShippedToCourier && order.isDelivered) {
      return "Delivered";
    }
    if (order.isShippedToCourier) {
      return "Shipped";
    }
    return "Unknown";
  }

  return (
    <Box sx={styles.wrapper}>
      {orderHistory
        ?.sort((a, b) => new Date(b.datePlaced) - new Date(a.datePlaced))
        .map((order) => (
          <Box key={order._id}>
            <Typography variant="h6">Order #: {order.shortId}</Typography>
            <Box>
              {order?.orderedItems?.map((item) => (
                <Box key={item._id}>
                  <Typography variant="body1">
                    {item.name} - {item.quantity} units at ${item.price} each
                  </Typography>
                  {/* <Typography variant="body1">
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body1">
                    Total Price: {item.price}
                  </Typography> */}
                </Box>
              ))}
            </Box>{" "}
            <Typography variant="body1">Total: {order.totalPrice}</Typography>
            {order.isPaid && <Typography>Paid: yes</Typography>}
            <Typography sx={{ display: "inline-flex" }}>
              Status: {getOrderStatus(order)}
            </Typography>{" "}
            <Typography>
              Date Placed:{" "}
              {order.datePlaced &&
                format(new Date(order.datePlaced), "dd/MM/yyyy, HH:mm")}
            </Typography>{" "}
            {order.isShippedToCourier && (
              <>
                {" "}
                <Typography>
                  Data Shipped:{" "}
                  {order.isShippedToCourier &&
                    format(new Date(order.dateShipped), "dd/MM/yyyy, HH:mm")}
                </Typography>
                {order.isDelivered && (
                  <Typography>
                    Data Delivered:{" "}
                    {order.isDelivered &&
                      format(
                        new Date(order.dateDelivered),
                        "dd/MM/yyyy, HH:mm"
                      )}
                  </Typography>
                )}
                <Typography>
                  Courier Tracking Number: {order.courierTrackingNumber}
                </Typography>
              </>
            )}
            {!order.isShippedToCourier && !order.isCancelled && (
              <Button onClick={() => dispatch(cancelOrder(token, order._id))}>
                Cancel Order
              </Button>
            )}
            {!order.isShippedToCourier && !order.isCancelled && (
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
            {order.isShippedToCourier && !order.isDelivered && (
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
            {order.isCancelled && (
              <Button variant="contained" disabled>
                Cancelled
              </Button>
            )}
            <hr></hr>
          </Box>
        ))}
    </Box>
  );
};

export default AdminOrders;
