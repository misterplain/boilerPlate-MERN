import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserOrders,
} from "../../../actions/orderHistoryActions";
import { Outlet } from "react-router-dom";
import OrderSnapshot from "../../OrderSnapshot/OrderSnapshot";
import PageTitle from "../../PageTitle/PageTitle";

const styles = {
  wrapper: {
    // display: "flex",
    // flexDirection: "column",
  },
};

const AccountOrders = () => {
  const dispatch = useDispatch();
  const orderHistoryState = useSelector((state) => state.orderHistory);
  const {orders} = orderHistoryState;
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;

  useEffect(() => {
    dispatch(fetchUserOrders(token));
  }, []);


  return (
    <Box sx={styles.wrapper}>
      {orders.length === 0 && (
        <PageTitle title="No orders found" size="h6"  lineBorder/>
      )}
      {orders
        ?.sort((a, b) => new Date(b.datePlaced) - new Date(a.datePlaced))
        .map((order) => (
          <OrderSnapshot order={order} isAdmin={false} key={order._id}/>
        ))}
      <Outlet />
    </Box>
  );
};

export default AccountOrders;
