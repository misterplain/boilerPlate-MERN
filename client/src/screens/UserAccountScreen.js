import React, { Component, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import AccountDetails from "../components/UserAccount/Account/AccountDetails";
import AccountOrders from "../components/UserAccount/Orders/AccountOrders";
import AccountAddress from "../components/UserAccount/Address/AccountAddress";

const styles = {
  buttonsWrapper: {
    border: "1px solid black",
  },
};

const accountButtons = [
  {
    name: "Account Details",
    link: "details",
    component: "Details",
  },
  {
    name: "Addresses",
    link: "address",
    component: "Addresses",
  },
  {
    name: "Orders",
    link: "orders",
    component: "Orders",
  },
];


const UserAccountScreen = () => {

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={4}
        sx={{ display: "flex", justifyContent: "space-around" }}
      >
        <Box sx={styles.buttonsWrapper}>
          {accountButtons.map((button) => (
            <Box key={button.name}>
              <Link component={NavLink} to={button.link}>
                <Button>{button.name}</Button>
              </Link>
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid item xs={12} md={7}>
        <Routes>
          {" "}
          <Route path="details" element={<AccountDetails />} />
          <Route path="orders" element={<AccountOrders />} />
          <Route path="address" element={<AccountAddress />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default UserAccountScreen;
