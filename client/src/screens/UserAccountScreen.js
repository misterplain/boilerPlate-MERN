import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Route, Routes } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import AccountDetails from "../components/UserAccount/Account/AccountDetails";
import AccountOrders from "../components/UserAccount/Orders/AccountOrders";
import AccountAddress from "../components/UserAccount/Address/AccountAddress";
import OrderSummary from "../components/OrderSummary/OrderSummary";
import Wrapper from "../components/Wrapper/Wrapper";
import { useTheme } from "@mui/material/styles";

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

const AccountOrdersWrapper = () => {
  return (
    <Routes>
      <Route path="/" element={<AccountOrders />} />
      <Route path="order-summary/:orderId" element={<OrderSummary />} />
    </Routes>
  );
};

const UserAccountScreen = () => {
  const theme = useTheme();
  return (
    // <Grid container>
    <Wrapper gridContainer width="100%" direction="row" justifyContent="space-around">
      {" "}
      <Grid
        item
        xs={12}
        md={3}
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "flex-end",
          borderRight: "1px solid grey",
          [theme.breakpoints.down("md")]: {
            alignItems: "center",
            borderRight: "none",
            borderBottom: "1px solid grey",
          },
        }}
      >
        {accountButtons.map((button) => (
          <Link component={NavLink} to={button.link} key={button.link}>
            <Button>{button.name}</Button>
          </Link>
        ))}
      </Grid>
      <Grid item xs={12} md={8}>
        <Routes>
          <Route path="details" element={<AccountDetails />} />
          <Route path="orders/*" element={<AccountOrdersWrapper />} />
          <Route path="address" element={<AccountAddress />} />
        </Routes>
      </Grid>
    </Wrapper>

    // </Grid>
  );
};

export default UserAccountScreen;
