import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";

const CheckoutUser = () => {
  return (
    <Box>
      <Link component={NavLink} to="/auth">
        {" "}
        <Button>log in</Button>{" "}
      </Link>

      <Link component={NavLink} to="/register">
        {" "}
        <Button>sign up</Button>
      </Link>
      <Button>continue as guest</Button>
    </Box>
  );
};

export default CheckoutUser;
