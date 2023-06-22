import React, { useState, useEffect } from "react";
import { useHistory, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import { fetchUserOrders } from "../../../actions/orderActions";

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
  },
};

const AccountOrders = () => {
  const dispatch = useDispatch();
  const userDetailsState = useSelector((state) => state.userDetails);
  const { isGuest, userDetails, orderHistory } = userDetailsState;
  const userAuthState = useSelector((state) => state.userAuth);
  const token = userAuthState?.accessToken;

  useEffect(() => {
    dispatch(fetchUserOrders(token))
  }, []);

  return <Box sx={styles.wrapper}></Box>;
};

export default AccountOrders;
