import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Wrapper from "../Wrapper/Wrapper";

const Footer = () => {
  return (
    <Wrapper
      customStyles={{
        width: "100%",
        height: "40px",
        borderTop: "1px solid grey",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        background: "white"
      }}
    >
      <Typography>Footer</Typography>
    </Wrapper>
  );
};

export default Footer;
