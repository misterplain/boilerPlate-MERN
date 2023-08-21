import React from "react";
import Button from "@mui/material/Button";
import { Route, Routes } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";
import AdvancedSearch from "./AdvancedSearch";
import QuickView from "./QuickView";
import OrderSummary from "../../OrderSummary/OrderSummary";
import Wrapper from "../../Wrapper/Wrapper";


const AdminOrders = () => {

  return (
    <Wrapper flexDirection="column">
      <Wrapper justifyContent="space-between" customStyles={{
        borderBottom: "3px solid black",
      }}>
        <Link component={NavLink} to="quick-view">
   
          <Button color="success">quick view</Button>
        </Link>
        <Link component={NavLink} to="advanced-search">
          {" "}
          <Button color="secondary">Advanced Search</Button>
        </Link>
      </Wrapper>{" "}
      <Routes>
        <Route path="/" element={<QuickView />} />
        <Route path="quick-view" element={<QuickView />} />
        <Route path="advanced-search" element={<AdvancedSearch />} />
        <Route path="order-summary/:orderId" element={<OrderSummary />} />
      </Routes>
    </Wrapper>
  );
};

export default AdminOrders;
