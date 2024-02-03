import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { loginForm, logoutUser } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import heroBackGround from "../../assets/heroBackGround.jpg";
import Wrapper from "../Wrapper/Wrapper";
import { useTheme } from "@mui/material/styles";

const styles = {
  responsiveWrapper: (theme) => ({
    width: "100%",
    padding: "0rem 0.5rem",
    [theme.breakpoints.up("sm")]: {
      padding: "0rem 1rem",
    },
    [theme.breakpoints.up("md")]: {
      padding: "0rem 3rem",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "0rem 5rem",
    },
    [theme.breakpoints.up("lg")]: {
      padding: "0rem 8rem",
    },
    [theme.breakpoints.up("xl")]: {
      padding: "0rem 12rem",
    },
  }),
};

const ResponsiveWrapper = ({ children }) => {
  const theme = useTheme();
  return <Box sx={styles.responsiveWrapper(theme)}>{children}</Box>;
};

export default ResponsiveWrapper;
