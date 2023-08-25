import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserOrders,
} from "../../../actions/orderHistoryActions";
import { Outlet } from "react-router-dom";
import OrderSnapshot from "../../OrderSnapshot/OrderSnapshot";

const styles = {
  wrapper: {
    // display: "flex",
    // flexDirection: "column",
  },
};

const AccountOrders = () => {
  const dispatch = useDispatch();
  const userDetailsState = useSelector((state) => state.userDetails);
  const orderHistoryState = useSelector((state) => state.orderHistory);
  const {orders} = orderHistoryState;
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;

  useEffect(() => {
    dispatch(fetchUserOrders(token));
  }, []);


  return (
    <Box sx={styles.wrapper}>
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
