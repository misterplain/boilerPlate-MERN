import React from "react";
import { Box, Typography } from "@mui/material";
import Card from "../components/Card/Card";
import { NavLink } from "react-router-dom";
import { Link } from "@mui/material";

const styles = {
  wrapper: {
    border: "1px solid black",
    display: "flex",
    flexDirection: "row",
    padding: "50px 20px",
    justifyContent: "center",
    alignItems: "center",

  },
};
const HomeScreen = () => {
  return (
    <Box  sx={styles.wrapper}>
<Typography>HOME SCREEN</Typography>
    </Box>
  );
};

export default HomeScreen;
