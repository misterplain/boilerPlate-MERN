import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Wrapper from "../Wrapper/Wrapper";

const Footer = () => {
  return (
    <Wrapper
      customStyles={{
        position: "fixed",
        bottom: "2%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Typography>Footer</Typography>
    </Wrapper>
  );
};

export default Footer;
