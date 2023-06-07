import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import CartItems from "../components/CartItems/CartItems";
import CartSummary from "../components/CartSummary/CartSummary";

const CartScreen = () => {
  return (

    <>
      <Box>
        <Typography variant="h2">Shopping Cart</Typography>
      </Box>
      {/* <Grid container direction={{ xs: "column-reverse", md: "row" }}> */}
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: { xs: "row-reverse", md: "row" },
        }}
      >
        <Grid item xs={12} md={9} sx={{ order: { xs: 2, md: 1 }, height: "200px", border: "1px solid blue" }}>
          <Typography>Cart Items</Typography>
          <CartItems/>
        </Grid>

        <Grid item xs={12} md={3} sx={{ order: { xs: 1, md: 2 }, height: "200px", border: "1px solid red" }}>
          <Typography>Cart Summary</Typography>
          <CartSummary/>
        </Grid>
      </Grid>
    </>
  );
};

export default CartScreen;
